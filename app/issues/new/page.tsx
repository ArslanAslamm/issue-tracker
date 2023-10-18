"use client";
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  interface validate {
    title: string;
    description: string;
  }
  const { register, control, handleSubmit } = useForm<validate>();
  const router = useRouter();
  return (
    <form
      className="max-w-2xl p-5 space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title", { required: true, maxLength: 20 })}
        />
      </TextField.Root>
      {/* <SimpleMDE placeholder="Description " /> */}
      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />
      <Button type="submit">Add Issue</Button>
    </form>
  );
};

export default page;
