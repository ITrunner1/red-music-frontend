import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActions } from "@/hooks/useActions";
import { IRegisterData } from "@/interfaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchemaRegsiter = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(5).max(15, {
        message: "Password must be at least 5 characters and maximum 15.",
    }),
    name: z.string().min(5).max(15, {
        message: "Password must be at least 5 characters and maximum 15.",
    }),
})


const RegistrationForm: FC = () => {

    const [type, setType] = useState('register')  

    const form = useForm<z.infer<typeof formSchemaRegsiter>>({
        resolver: zodResolver(formSchemaRegsiter),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const { register } = useActions()

    const onSubmitRegister: SubmitHandler<IRegisterData> = data => {              
        register(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitRegister)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="test@test.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                Для регистрации необходима почта
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                {type === 'login' ? 'Введите ваш пароль' : 'Придумайте ваш пароль'}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Tester Piva" {...field} />
                            </FormControl>
                            <FormDescription>
                                Придумайте себе имя
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        className="w-full"
                        type="submit" variant="outline"
                    >
                        Регистрация
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default RegistrationForm