import { useForm } from "react-hook-form";

import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateSpecialist } from "./useCreateSpecialist";
import { useEditSpecialist } from "./useEditSpecialist";

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${props =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

function CreateSpecialistForm({ specialistToEdit = {}, onCloseModal }) {
    const { isCreating, createSpecialist } = useCreateSpecialist();
    const { isEditing, editSpecialist } = useEditSpecialist();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = specialistToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    function onSubmit(data) {
        const imageUrl =
            typeof data.imageUrl === "string"
                ? data.imageUrl
                : data.imageUrl[0];

        if (isEditSession)
            editSpecialist(
                { newSpecialistData: { ...data, imageUrl }, id: editId },
                {
                    onSuccess: data => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createSpecialist(
                { ...data, imageUrl: imageUrl },
                {
                    onSuccess: data => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors) {
        console.error(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}>
            <FormRow label='Specialist Name' error={errors?.fullName?.message}>
                <Input
                    type='text'
                    id='fullName'
                    disabled={isWorking}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* {!isEditSession && ( */}
            <FormRow label='Email' error={errors?.email?.message}>
                <Input
                    type='email'
                    id='email'
                    disabled={isEditSession || isWorking}
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
            </FormRow>
            {/* )} */}

            <FormRow label='Experience' error={errors?.experience?.message}>
                <Input
                    type='number'
                    id='experience'
                    disabled={isWorking}
                    {...register("experience", {
                        required: "This field is required",
                        min: {
                            value: 5,
                            message: "Experience should be at least 5",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label='Specialization'
                error={errors?.specialization?.message}>
                <StyledSelect
                    id='specialization'
                    disabled={isWorking}
                    {...register("specialization", {
                        required: "This field is required",
                    })}>
                    <option value=''>Select a specialization...</option>
                    <option value='dentist'>Dentist</option>
                    <option value='physiotherapist'>Physiotherapist</option>
                    <option value='ophthalmologist'>Ophthalmologist</option>
                    <option value='gynecologist'>Gynecologist</option>
                    <option value='pediatrician'>Pediatrician</option>
                    <option value='general practitioner'>
                        General Practitioner
                    </option>
                </StyledSelect>

                {/* <select
                    id='specialization'
                    disabled={isWorking}
                    {...register("specialization", {
                        required: "This field is required",
                    })}>
                    <option value=''>Select a specialization...</option>
                    <option value='dentist'>Dentist</option>
                    <option value='physiotherapist'>Physiotherapist</option>
                    <option value='ophthalmologist'>Ophthalmologist</option>
                    <option value='gynecologist'>Gynecologist</option>
                    <option value='pediatrician'>Pediatrician</option>
                    <option value='general practitioner'>
                        General Practitioner
                    </option>
                </select> */}
            </FormRow>

            <FormRow label='Location' error={errors?.location?.message}>
                <Input
                    type='text'
                    id='location'
                    disabled={isWorking}
                    {...register("location", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label='Price' error={errors?.price?.message}>
                <Input
                    type='number'
                    id='price'
                    disabled={isWorking}
                    {...register("price", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label='Bio' error={errors?.bio?.message}>
                <Textarea
                    type='text'
                    id='bio'
                    disabled={isWorking}
                    {...register("bio", {
                        required: "This field is required",
                        maxLength: {
                            value: 1000,
                            message: "Bio cannot exceed 1000 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow label='Specialist Image'>
                <FileInput
                    id='imageUrl'
                    accept='image/*'
                    {...register("imageUrl", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation='secondary'
                    type='reset'
                    onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession
                        ? "Edit Specialist"
                        : "Create new Specialist"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateSpecialistForm;
