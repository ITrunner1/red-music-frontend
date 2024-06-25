'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const WriteToUsMain = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "a1b3fccd-c1d4-424e-af8b-6b6f52197529");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl max-sm:text-2xl">
                Хотите связаться с нами?
            </div>
            <div className="text-3xl my-4 max-sm:text-xl">
                Напишите нам сообщение!
            </div>
            <div className="w-[400px] max-sm:w-[300px] text-2xl ease-in-out">
                <form onSubmit={onSubmit} className="space-y-4 my-6 max-sm:text-sm">
                    <div className="">
                        <div className="my-2">
                            <Label className="text-xl max-sm:text-md">Имя</Label>
                        </div>
                        <div className="my-2">
                            <Input className="text-xl h-[50px] max-sm:text-md" name="name" type="name" placeholder="Yuriy" />
                        </div>
                    </div>
                    <div className="">
                        <div className="my-2">
                            <Label className="text-xl max-sm:text-md max-sm:text-md">Фамилия</Label>
                        </div>
                        <div className="my-2">
                            <Input className="text-xl h-[50px] max-sm:text-md" name="lastName" type="lastName" placeholder="Ivanov" />
                        </div>
                    </div>
                    <div className="">
                        <div className="my-2">
                            <Label className="text-xl max-sm:text-md">Ваш email</Label>
                        </div>
                        <div>
                            <Input className="text-xl h-[50px] max-sm:text-md" name="email" type="email" placeholder="test@test.com" />
                        </div>
                    </div>
                    <div className="">
                        <div className="my-2">
                            <Label className="text-xl max-sm:text-md">Напишите сообщение</Label>
                        </div>
                        <div>
                            <Textarea className="text-xl h-[50px] max-sm:text-md" name="text" placeholder="Text" />
                        </div>
                    </div>
                    <div>
                        <Button className="w-full mt-4" type="submit">
                            Отправить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WriteToUsMain