import { FC } from "react";
import { ICommentDto } from "@/interfaces/comment.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { commentApi } from "@/store/api/api.comment";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdSend } from "react-icons/md";

const formSchema = z.object({
    text: z.string().min(2).max(500, {
        message: "Message should be at least 2 characters",
    }),
})

const AddCommentForm: FC<{ songId: number }> = ({ songId }) => {

    const form = useForm<ICommentDto>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });

    const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation()

    const onSubmit: SubmitHandler<ICommentDto> = async data => {
        writeComment({ ...data, songId })
            .unwrap()

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Напишите комментарий" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        className="mt-4 w-10 h-10"
                        size='icon'
                        disabled={isLoading}
                    >
                        <MdSend size={28} />
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AddCommentForm