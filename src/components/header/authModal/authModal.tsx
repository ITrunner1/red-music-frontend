'use client';

import RegistrationForm from "./registrationForm";
import { FC, useState } from "react";
import { FaUserCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActions } from "@/hooks/useActions";
import { Label } from "@/components/ui/label";
import { IAuthData } from "@/interfaces/auth.interface";
import { useRouter } from "next/navigation";

const formSchemaAuth = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(5).max(15, {
    message: "Password must be at least 5 characters and maximum 15.",
  }),
})

const AuthModal: FC = () => {
  const router = useRouter()
    
  const [type, setType] = useState('login')

  const { login } = useActions()

  const form = useForm<z.infer<typeof formSchemaAuth>>({
    resolver: zodResolver(formSchemaAuth),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitAuth: SubmitHandler<IAuthData> = data => {
    login(data)
    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="link" className="mx-2 text-3xl opacity-75 hover:opacity-100">
          <FaUserCircle fill='#FFFFFF' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Логин</DialogTitle>
          <DialogDescription>
            Войдите в свою учетную запись.
          </DialogDescription>
        </DialogHeader>
        {type === 'login' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAuth)} className="space-y-8">
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
                      Введите ваш email
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
                      Введите ваш пароль
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
                  Логин
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <RegistrationForm />
        )}
        <Label>
          {type === 'login' ? 'Нет учетной записи? Зарегистрируйтесь!' : 'Есть учетная запись? Войдите!'}
        </Label>
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={() => setType(type === 'login' ? 'register' : 'login')}
        >
          {type === 'login' ? 'Регистрация' : 'Логин'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal;