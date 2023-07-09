import styled from "@emotion/styled/macro";
import * as types from "../../components/types";

const FormSelectFetch = ({ name, data, ...props }: types.FormSelectFetch) => {
  return (
    <select name={name} {...props} required>
      {data?.map((item, idx) => (
        <option key={idx} value={item[name]}>
          {item[name]}
        </option>
      ))}
    </select>
  );
};

const FormSelect = styled(FormSelectFetch)({
  width: "100%",
  color: "rgb(74,85,104)",
  paddingTop: "8px",
  paddingBottom: "8px",
  lineHeight: "1.25",
  borderRadius: "4px",
});

export default FormSelect;
