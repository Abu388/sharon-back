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
            <ul className="flex items-center gap-4 pt-1">
              <li>
                <a
                  href="https://vm.tiktok.com/ZMSeFHAuM"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-[#f14d52]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    className="size-10"
                  >
                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://youtu.be/RUYJ4VuHbT0?si=Me9dxCQiKwpAfYBL"
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
        <p className="*:hover:text-[#f14d52] *:hover:underline">
          <a href="#contact">Contact Us</a> |{" "}
          <a href="#privacy">Privacy Policy</a> |{" "}
          <a href="#terms">Terms of Service</a>
        </p>
        <p className="mt-4 text-xs text-white/70">
          Powered by{" "}
          <a
            href="https://sabihsystem.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-[#f14d52] hover:underline"
          >
            Sabih System Company
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
