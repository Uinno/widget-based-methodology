import * as yup from "yup";
import {useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";
import {EditCarDialogForm} from "../../../../widgets/EditCarDialog/types/EditCarDialog.types";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useEffect} from "react";
import {createCarDialogIsDirty} from "../store/CreateCarDialog.store";

const schema = yup.object({
    brand: yup.string().required().min(1),
    model: yup.string().required().min(1),
    year: yup.number().required().min(1970).max(2022)
});

export const useCreateCarDialogForm = () => {

    const setCreateCarDialogIsDirty = useSetRecoilState(createCarDialogIsDirty);

    const methods = useForm<EditCarDialogForm>({
        defaultValues: schema.getDefault(),
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setCreateCarDialogIsDirty(methods.formState.isDirty);
    }, [methods.formState.isDirty, setCreateCarDialogIsDirty])

    return methods;
}
