import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useDarkTheme } from "../store/ThemeManage";
const Form = ({
  heading,
  description,
  formFields,
  button,
  onSubmit,
  onInputChange,
  formData,
  AltSignup,
  Altevent,
  Altsvg,
}) => {
  const { dark } = useDarkTheme();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {heading}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {description}
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={onSubmit}
        >
          {formFields.map((field) => (
            <div key={field.id} className="mb-4">
              <div className="flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray">
                  {field.label}
                </Typography>
                <Input
                  size="lg"
                  placeholder={field.placeholder}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type={field.type}
                  value={formData[field.id] || ""}
                  onChange={(e) => onInputChange(e, field.id)}
                />
              </div>
            </div>
          ))}
          <Button type="submit" color="blue">
            {button}
          </Button>
        </form>
        <Button
          size="lg"
          variant={!dark ? "outlined" : "filled"}
          color={!dark ? "blue-gray" : "white"}
          className="flex items-center gap-3"
          onClick={Altevent}
        >
          {Altsvg}
          {AltSignup}
        </Button>
      </Card>
    </div>
  );
};

export default Form;
