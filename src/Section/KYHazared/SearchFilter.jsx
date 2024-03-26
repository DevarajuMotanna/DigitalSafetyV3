import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormProvider from "../../components/HookForm/FormProvider";
// import { RHFSelect } from "../../components/HookForm/RHFSelect";
import RHFTextField from "../../components/HookForm/RHFTextField";

const SearchFilter = () => {
  const Schema = Yup.object().shape({
    location: Yup.string(),
    selectWorkPermit: Yup.string(),
    third: Yup.string(),
    forth: Yup.string(),
  });

  const defaultValues = () => ({
    location: "",
    selectWorkPermit: "",
    third: "",
    forth: "",
  });
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const {
    // reset,
    handleSubmit,

    formState: { errors },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
  };
  console.log(errors);

  return (
    <FormProvider onSubmit={() => handleSubmit(onSubmit)}>
      {/* <RHFSelect nativer label="b" name="location">
        {["a", "b", "c"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect native label="A" name="selectWorkPermit">
        {["a", "b", "c"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </RHFSelect> */}
      <RHFTextField name="third" label="third" />
      <RHFTextField name="fourth" label="forth" />
    </FormProvider>
  );
};

export default SearchFilter;
