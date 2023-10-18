"use client";
import React, { useState } from "react";
import { TextField, Button, Callout } from "@radix-ui/themes";
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
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <div className="flex justify-center items-center flex-col p-5 w-[1500px]">
      <h1 className="text-3xl font-bold text-center mb-5">New Issue</h1>

      {error && (
        <Callout.Root color="red" className="mb-3 w-[400px]">
          <Callout.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something went wrong");
          }
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
    </div>
  );
};

export default page;
