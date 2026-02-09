import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import AssignmentWeight from "./AssignmentWeight";
export default function AssignmentHeadControlButtons() {
  return (
    <div className="float-end">
      <AssignmentWeight />
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}