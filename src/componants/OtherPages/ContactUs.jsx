import { useLayoutEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { BiPhoneCall } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiInformation2Line } from "react-icons/ri";
import { ImProfile } from "react-icons/im";

import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const ContactUs = () => {
    const form = useRef();

    const [isSending, setIsSending] = useState(false);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        problem: "",
        description: "",
    });

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (status.message) {
            setStatus({
                type: "",
                message: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSending) return;

        setIsSending(true);

        setStatus({
            type: "",
            message: "",
        });

        try {
            await emailjs.sendForm(
                "service_bc827iz",
                "template_4hvdldl",
                form.current,
                {
                    publicKey: "9PL7zAu2OVtwoIROo",
                }
            );

            setStatus({
                type: "success",
                message: "Your message has been sent successfully!",
            });

            setFormData({
                name: "",
                email: "",
                problem: "",
                description: "",
            });

        }

        catch (error) {
            console.error("EmailJS Error:", error);
            console.error("EmailJS Error Text:", error?.text);
            console.error("EmailJS Error Status:", error?.status);

            setStatus({
                type: "error",
                message: error?.text || "Something went wrong. Please try again.",
            });
        }

        finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#C8E6D0]">

            <main className="w-11/12 lap:w-10/12 des:w-9/12 mx-auto pt-12 tab:pt-16 lap:pt-20 pb-24 tab:pb-32">

                {/* Page Header */}
                <header className="text-center max-w-3xl mx-auto mb-12 tab:mb-16 lap:mb-20">

                    <h1 className="text-[#075E63] text-4xl tab:text-5xl lap:text-6xl font-semibold tracking-tight">
                        Contact Us
                    </h1>

                    <p className="mt-5 text-[#527A73] text-sm tab:text-base lap:text-lg leading-relaxed max-w-xl mx-auto">
                        Have a question, need help, or want to tell us
                        something? We would love to hear from you.
                    </p>

                </header>


                {/* Main Contact Container */}
                <section className="bg-[#EAF3EA] rounded-[2rem] tab:rounded-[2.5rem] lap:rounded-[3rem] p-6 tab:p-10 lap:p-14 border border-[#DCE9DE] shadow-[0_12px_40px_rgba(40,90,70,0.06)]">

                    <div className="tab:grid tab:grid-cols-2 gap-10 lap:gap-16">


                        {/* LEFT SIDE */}
                        <div className="flex flex-col justify-between">

                            <div>

                                {/* Label */}
                                <div className="flex items-center gap-3 mb-5">

                                    <span className="w-8 h-px bg-[#28706E]"></span>

                                    <span className="text-[#28706E] text-[10px] tab:text-xs tracking-[0.18em] font-medium">
                                        GET IN TOUCH
                                    </span>

                                </div>


                                {/* Heading */}
                                <h2 className="max-w-96 text-[#075E63] text-2xl tab:text-3xl lap:text-4xl font-semibold leading-tight">
                                    We’re here to help you and your pet.
                                </h2>


                                {/* Description */}
                                <p className="max-w-96 mt-5 text-[#527A73] text-sm tab:text-base leading-7">
                                    Whether you have a question about our
                                    products, delivery, or
                                    something else, send us a message and our
                                    team will get back to you.
                                </p>


                                {/* Contact Information */}
                                <div className="mt-8 tab:mt-10 space-y-6">

                                    {/* Phone */}
                                    <div className="flex gap-4 items-start">

                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#DFECE1] border border-[#D2E2D5] flex items-center justify-center text-[#075E63]">
                                            <BiPhoneCall className="text-xl" />
                                        </div>

                                        <div>

                                            <p className="text-[#075E63] text-sm tab:text-base font-semibold">
                                                +880-123-456-7890
                                            </p>

                                            <p className="mt-1 text-[#527A73] text-xs tab:text-sm">
                                                Monday–Friday · 8:00–17:00
                                            </p>

                                        </div>

                                    </div>


                                    {/* Location */}
                                    <div className="flex gap-4 items-start">

                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#DFECE1] border border-[#D2E2D5] flex items-center justify-center text-[#075E63]">
                                            <HiOutlineLocationMarker className="text-xl" />
                                        </div>

                                        <div>

                                            <p className="text-[#075E63] text-sm tab:text-base font-semibold">
                                                Bangladesh
                                            </p>

                                            <p className="mt-1 text-[#527A73] text-xs tab:text-sm leading-6">
                                                1234 Green Park Lane, Dhaka,
                                                Bangladesh
                                            </p>

                                        </div>

                                    </div>


                                    {/* Email */}
                                    <div className="flex gap-4 items-start">

                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#DFECE1] border border-[#D2E2D5] flex items-center justify-center text-[#075E63]">
                                            <RiInformation2Line className="text-xl" />
                                        </div>

                                        <div>

                                            <p className="text-[#075E63] text-sm tab:text-base font-semibold">
                                                contact@furfriendz.com
                                            </p>

                                            <p className="mt-1 text-[#527A73] text-xs tab:text-sm">
                                                Drop us a message anytime.
                                            </p>

                                        </div>

                                    </div>


                                    {/* Jobs */}
                                    <div className="flex gap-4 items-start">

                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#DFECE1] border border-[#D2E2D5] flex items-center justify-center text-[#075E63]">
                                            <ImProfile className="text-lg" />
                                        </div>

                                        <div>

                                            <p className="text-[#075E63] text-sm tab:text-base font-semibold">
                                                jobs@furfriendz.com
                                            </p>

                                            <p className="mt-1 text-[#527A73] text-xs tab:text-sm leading-6">
                                                Interested in joining the
                                                FurFriendz team?
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Social Links */}
                            <div className="mt-10 tab:mt-12">

                                <p className="text-[#527A73] text-xs mb-4">
                                    Follow FurFriendz
                                </p>

                                <div className="flex gap-3">
                                    <a
                                        href="https://www.youtube.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-[#BBD5C2] text-[#075E63] flex items-center justify-center hover:bg-[#075E63] hover:text-white cursor-pointer transition duration-300"
                                    >
                                        <IoLogoYoutube className="text-lg" />
                                    </a>

                                    <a
                                        href="https://x.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-[#BBD5C2] text-[#075E63] flex items-center justify-center hover:bg-[#075E63] hover:text-white cursor-pointer transition duration-300"
                                    >
                                        <FaXTwitter className="text-lg" />
                                    </a>

                                    <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-[#BBD5C2] text-[#075E63] flex items-center justify-center hover:bg-[#075E63] hover:text-white cursor-pointer transition duration-300"
                                    >
                                        <FaFacebook className="text-lg" />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-[#BBD5C2] text-[#075E63] flex items-center justify-center hover:bg-[#075E63] hover:text-white cursor-pointer transition duration-300"
                                    >
                                        <RiInstagramFill className="text-lg" />
                                    </a>
                                </div>

                            </div>

                        </div>


                        {/* RIGHT SIDE - FORM */}
                        <div className="mt-12 tab:mt-0">

                            <div className="bg-[#DFECE1] border border-[#D2E2D5] rounded-3xl p-6 tab:p-8 lap:p-10">

                                {/* Form Header */}
                                <div className="mb-7">

                                    <p className="text-[#28706E] text-[10px] tab:text-xs tracking-[0.18em] font-medium">
                                        SEND A MESSAGE
                                    </p>

                                    <h3 className="mt-2 text-[#075E63] text-xl tab:text-2xl lap:text-3xl font-semibold">
                                        How can we help?
                                    </h3>

                                </div>


                                {/* Contact Form */}
                                <form
                                    ref={form}
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >

                                    {/* Name */}
                                    <div>

                                        <label
                                            htmlFor="name"
                                            className="block text-[#075E63] text-xs tab:text-sm font-medium mb-2"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            required
                                            className="w-full h-12 px-4 rounded-xl bg-[#F7FBF6] border border-[#C9DCCF] text-[#075E63] text-sm outline-none placeholder:text-[#8AA79D] focus:border-[#28706E] focus:ring-2 focus:ring-[#28706E]/10 transition duration-200"
                                        />

                                    </div>


                                    {/* Email */}
                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="block text-[#075E63] text-xs tab:text-sm font-medium mb-2"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full h-12 px-4 rounded-xl bg-[#F7FBF6] border border-[#C9DCCF] text-[#075E63] text-sm outline-none placeholder:text-[#8AA79D] focus:border-[#28706E] focus:ring-2 focus:ring-[#28706E]/10 transition duration-200"
                                        />

                                    </div>


                                    {/* Problem */}
                                    <div>

                                        <label
                                            htmlFor="problem"
                                            className="block text-[#075E63] text-xs tab:text-sm font-medium mb-2"
                                        >
                                            What can we help you with?
                                        </label>

                                        <select
                                            id="problem"
                                            name="problem"
                                            value={formData.problem}
                                            onChange={handleChange}
                                            required
                                            className={`w-full h-12 px-4 rounded-xl bg-[#F7FBF6] border border-[#C9DCCF] text-sm outline-none focus:border-[#28706E] focus:ring-2 focus:ring-[#28706E]/10 transition duration-200 ${formData.problem
                                                ? "text-[#075E63]"
                                                : "text-[#8AA79D]"
                                                }`}
                                        >

                                            <option value="" disabled>
                                                Select a topic
                                            </option>

                                            <option value="Product or Fur Shop">
                                                Product or Fur Shop
                                            </option>

                                            <option value="Pet Delivery">
                                                Pet Delivery
                                            </option>

                                            <option value="Order or Payment">
                                                Order or Payment
                                            </option>

                                            <option value="Account or Website">
                                                Account or Website
                                            </option>

                                            <option value="Complaint or Feedback">
                                                Complaint or Feedback
                                            </option>

                                            <option value="Something Else">
                                                Something Else
                                            </option>

                                        </select>

                                    </div>


                                    {/* Description */}
                                    <div>

                                        <label
                                            htmlFor="description"
                                            className="block text-[#075E63] text-xs tab:text-sm font-medium mb-2"
                                        >
                                            Description
                                        </label>

                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Tell us a little more about how we can help..."
                                            rows="5"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-[#F7FBF6] border border-[#C9DCCF] text-[#075E63] text-sm leading-6 outline-none resize-none placeholder:text-[#8AA79D] focus:border-[#28706E] focus:ring-2 focus:ring-[#28706E]/10 transition duration-200"
                                        />

                                    </div>


                                    {/* Status Message */}
                                    {status.message && (
                                        <div
                                            className={`rounded-xl px-4 py-3 text-sm ${status.type === "success"
                                                ? "bg-[#DCEFE0] text-[#286B52] border border-[#C8E3D0]"
                                                : "bg-[#F5E1DF] text-[#9A4C45] border border-[#E8C9C5]"
                                                }`}
                                        >
                                            {status.message}
                                        </div>
                                    )}


                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className={`w-full h-12 rounded-xl text-white text-sm font-medium transition duration-300 ${isSending
                                            ? "bg-[#6F9690] cursor-not-allowed"
                                            : "bg-[#075E63] hover:bg-[#064F53] cursor-pointer"
                                            }`}
                                    >
                                        {isSending
                                            ? "Sending..."
                                            : "Send Message"}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default ContactUs;