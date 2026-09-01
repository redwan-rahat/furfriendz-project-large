import { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import DownArrow from "../Animations/DownArrow";
import { AuthContex } from "../AuthProvider/AuthProvider";

const Section5 = () => {
    const { setVisible, setType, setMessage } = useContext(AuthContex);

    const form = useRef();
    const [isSending, setIsSending] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        problem: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSending) return;

        setIsSending(true);

        try {
            await emailjs.sendForm(
                "service_bc827iz",
                "template_4hvdldl",
                form.current,
                {
                    publicKey: "9PL7zAu2OVtwoIROo",
                }
            );

            setFormData({
                name: "",
                email: "",
                problem: "",
                description: "",
            });

            setTimeout(() => {
                setVisible(true);
                setType("info");
                setMessage("Message Sent Successfully");
            }, 200);
        }

        catch (error) {
            console.error("EmailJS Error:", error);
            console.error("EmailJS Error Text:", error?.text);
            console.error("EmailJS Error Status:", error?.status);

            setTimeout(() => {
                setVisible(true);
                setType("error");
                setMessage(
                    error?.text || "Something went wrong. Please try again."
                );
            }, 200);
        }

        finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-fifth font-page pb-20 text-primary">

            {/* Down Arrow */}
            <div className="w-24 tab:w-44 h-28 des:w-56 tab:h-64 des:h-72 z-10 m-auto">
                <DownArrow />
            </div>


            {/* Heading */}
            <div className="text-primary text-center space-y-3 tab:space-y-6 tab:-mt-16">

                <h1 className="text-2xl tab:text-4xl lap:text-5xl des:text-7xl font-semibold">
                    Connect with us
                </h1>

                <h2 className="text-sm tab:text-base lap:text-lg">
                    Your pet’s happiness is just a message away
                </h2>

            </div>


            {/* FORM CONTAINER */}
            <div className="w-10/12 tab:w-8/12 des:w-3/6 bg-second m-auto mt-10">

                <div className="w-4/5 m-auto text-white">

                    <form
                        ref={form}
                        onSubmit={handleSubmit}
                        className="py-12 tab:py-14 des:py-16"
                    >

                        {/* FORM GRID */}
                        <div className="tab:grid tab:grid-cols-2 tab:gap-x-8 des:gap-x-12 gap-y-6">


                            {/* NAME */}
                            <div className="space-y-2">

                                <label
                                    htmlFor="name"
                                    className="block text-sm tab:text-base des:text-lg font-medium"
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
                                    className="w-full px-3 py-2.5 text-sm tab:text-sm des:text-base text-primary bg-white rounded-sm focus:outline-primary"
                                />

                            </div>


                            {/* EMAIL */}
                            <div className="space-y-2 mt-6 tab:mt-0">

                                <label
                                    htmlFor="email"
                                    className="block text-sm tab:text-base des:text-lg font-medium"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    required
                                    className="w-full px-3 py-2.5 text-sm tab:text-sm des:text-base text-primary bg-white rounded-sm focus:outline-primary"
                                />

                            </div>


                            {/* TOPIC DROPDOWN */}
                            <div className="space-y-2 mt-6 tab:mt-0">

                                <label
                                    htmlFor="problem"
                                    className="block text-sm tab:text-base des:text-lg font-medium"
                                >
                                    What can we help you with?
                                </label>

                                <select
                                    id="problem"
                                    name="problem"
                                    value={formData.problem}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-3 py-2.5 text-sm tab:text-sm des:text-base bg-white rounded-sm focus:outline-primary ${
                                        formData.problem
                                            ? "text-primary"
                                            : "text-gray-400"
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


                            {/* DESCRIPTION */}
                            <div className="space-y-2 mt-6 tab:mt-0 tab:col-span-2">

                                <label
                                    htmlFor="description"
                                    className="block text-sm tab:text-base des:text-lg font-medium"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell us a little more about how we can help..."
                                    required
                                    rows="5"
                                    className="w-full px-3 py-2.5 text-sm tab:text-sm des:text-base text-primary bg-white rounded-sm focus:outline-primary resize-none"
                                />

                            </div>

                        </div>


                        {/* SUBMIT BUTTON */}
                        <div className="mt-8 tab:mt-10">

                            <button
                                type="submit"
                                disabled={isSending}
                                className={`block m-auto px-7 py-2 rounded-md border-2 font-medium text-sm tab:text-base transition-all duration-300 ${
                                    isSending
                                        ? "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "border-primary bg-white text-primary hover:bg-primary hover:border-white hover:text-white cursor-pointer hover:scale-105"
                                }`}
                            >
                                {isSending ? "Sending..." : "Send Message"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Section5;