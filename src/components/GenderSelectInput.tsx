import { RandomUserGender } from "../types/random-user";

interface GenderSelectInputProps {
  onGenderChange: (value: RandomUserGender) => void;
  gender: RandomUserGender;
}

const GenderSelectInput: React.FC<GenderSelectInputProps> = ({ onGenderChange, gender }) => (
  <div className="form-control flex flex-row items-center">
    <label className="label block">
      <span className="label-text">Gender : </span>
    </label>
    <select
      value={gender}
      className="select select-bordered"
      onChange={(e) => onGenderChange(e.target.value as RandomUserGender)}
      data-testid="gender">
      <option value="all">All</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
);

export default GenderSelectInput;
