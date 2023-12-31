"use client";
import React, { useState } from "react";
import { TextField, Button, Callout, Text, TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
const IssueForm = () => {
  type IssueForm = z.infer<typeof createIssueSchema>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const submitForm = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmit(false);

      setError("Something went wrong" + error);
    }
  });
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
      <form className=" space-y-3" onSubmit={submitForm}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title", { required: true, maxLength: 20 })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* <SimpleMDE placeholder="Description " />
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        /> */}
        <textarea
          placeholder="description"
          {...register("description", { required: true, maxLength: 20 })}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <div className="flex justify-between">
          <Button type="submit" disabled={submit}>
            Add Issue {submit && <Spinner />}
          </Button>
          <Link href="/issues">
            <div className="text-zinc-500 px-2 py-1 border-2 rounded-md">
              Go Back
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
