// 0065ca // blue
// f14d52 // red

import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ApiClient from "@/api/ApiClient";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const validation = contactSchema.safeParse(formData);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message, {
        icon: <CircleAlert className="text-red-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ApiClient.post("/contact", formData);
      console.log("Form submitted successfully:", response.data);
      toast("Success", {
        description: "Form submitted successfully!",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.", {
        icon: <CircleAlert className="text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-(--blue)/80 py-10 font-[poppins] text-white">
      <div className="mx-auto flex max-w-full flex-col justify-between md:max-w-[80%] md:flex-col lg:max-w-[80%] xl:flex-row-reverse">
        <div className="flex flex-1 flex-col space-y-[12px] p-4">
          <h1 className="text-2xl font-light *:hover:text-[#ffb500] md:text-3xl">
            Send us a Message
          </h1>
          <form onSubmit={handleSubmit} className="max-w-200">
            <div className="my-4">
              <Input
                type="text"
                className="bg-white p-5 text-black"
                placeholder="Full Name"
                name="fullName"
              />
            </div>
            <div className="my-4">
              <Input
                type="email"
                className="bg-white p-5 text-black"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="my-4">
              <Input
                type="text"
                className="bg-white p-5 text-black"
                placeholder="Subject"
                name="subject"
              />
            </div>
            <Textarea
              className="mb-4 bg-white p-5 text-black"
              placeholder="Send us a message"
              name="message"
            />
            <Button
              className="w-full cursor-pointer bg-[#f14d52]/90 text-white hover:bg-[#f14d52]"
              disabled={loading}
            >
              {loading ? "Sending..." : "SEND"}
            </Button>
          </form>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <ul className="flex gap-4 pt-1">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-[#f14d52]"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="transition-colors hover:text-[#f14d52]"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .388.045.765.127 1.124C7.728 8.89 4.1 6.89 1.671 3.905c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.006-.423-.016-.633A9.936 9.936 0 0 0 24 4.557z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-[#f14d52]"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="transition-colors hover:text-[#f14d52]"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.612 3.5 12 3.5 12 3.5s-7.612 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.96 0 12 0 12s0 4.04.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.388 20.5 12 20.5 12 20.5s7.612 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.04 24 12 24 12s0-4.04-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-y-2 p-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Ways to Give</h3>
            <ul className="text-white/90 *:block *:w-fit *:hover:text-[#f14d52]">
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                Ways to Donate
              </Link>
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                Other Ways to Give
              </Link>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Ways to Advocate</h3>
            <ul className="text-white/90 *:block *:w-fit *:hover:text-[#f14d52]">
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                Volunteer
              </Link>
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                Pray with us
              </Link>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="text-white/90 *:block *:w-fit *:hover:text-[#f14d52]">
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                My Account
              </Link>
              <Link className="hover:text-[#f14d52] hover:underline" to={"#"}>
                Stories
              </Link>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="text-white/90 *:block *:w-fit *:hover:text-[#f14d52]">
              <li>
                <span className="block font-semibold text-white/90">
                  Phone:
                </span>
                <a
                  href="tel:+251115575880"
                  className="block text-sm text-white/80 hover:text-[#f14d52] hover:underline"
                >
                  +251-115575880, +251-944116957, +251-906903139, +251-906903138
                </a>
              </li>
              <li>
                <span className="block font-semibold text-white/90">
                  Address:
                </span>
                <span className="block text-sm text-white/80">
                  {/* cspell:disable-next-line */}
                  P.O.B: 4044 Addis Ababa, Ethiopia
                  <br />
                  Bole to Wolo Sefer, Kera Taxi Stand, TK Building,
                  <br />
                  near Rank Clinic
                </span>
              </li>
              <li>
                <span className="block font-semibold text-white/90">
                  Email:
                </span>
                <a
                  href="mailto:sharonethiopia@gmail.com"
                  className="block text-sm text-white/80 hover:text-[#f14d52] hover:underline"
                >
                  sharonethiopia@gmail.com
                </a>
                <a
                  href="mailto:scsethiopia@yahoo.com"
                  className="block text-sm text-white/80 hover:text-[#f14d52] hover:underline"
                >
                  scsethiopia@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="mx-auto my-3 w-[80%] rounded-full border border-t-1 border-blue-400/30" />
      <footer className="mx-auto w-fit py-10 text-center">
        <p>
          &copy; 2025 Sharon Children’s Services Ethiopia. All Rights Reserved.
        </p>
        <p className="*:hover:text-[#ffb500] *:hover:underline">
          <a href="#contact">
            <Link to="/Contact">Contact Us</Link>
          </a>{" "}
          | <a href="#privacy">Privacy Policy</a> |{" "}
          <a href="#terms">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
