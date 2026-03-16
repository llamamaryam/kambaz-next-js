"use client";
import { useParams } from "react-router";
import { assignments } from "../../data";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = assignments.find(
        (currentAssignment) => currentAssignment.course === cid && currentAssignment.id === aid
    );

    if (!assignment) {
        return <div id="wd-assignments-editor">Assignment not found.</div>;
    }

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue={assignment.title} /><br /><br />
            <textarea id="wd-description" defaultValue={`${assignment.title} for course ${cid}.`} />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
         
          <td>
                        <input id="wd-points" defaultValue={assignment.points} />
          </td>
        </tr>
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignemnt Group</label>
            </td>
            <td>
                <select id="wd-group">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select>
            </td>
        </tr>
        
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                </select>
  
                <td align="left" valign="top">
                    <label htmlFor="wd-editor-checkboxes">Online Entry Option</label><br/>
            
                    <input type="checkbox" name="Text Entry" id="wd-text-entry"/>
                    <label htmlFor="wd-text-entry">Text Entry</label><br/>

                    <input type="checkbox" name="Website URL" id="wd-website-url"/>
                    <label htmlFor="wd-website-url">Website URL</label><br/>

                    <input type="checkbox" name="Media Recordings" id="wd-media-recordings"/>
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                    <input type="checkbox" name="Student Annotation" id="wd-student-annotation"/>
                    <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                    <input type="checkbox" name="File Uploads" id="wd-file-upload"/>
                    <label htmlFor="wd-file-upload">File Uploads</label><br/>
                </td><br/>
                <td align="left" valign="top">
                    <label htmlFor="wd-assign-to">Assign to</label><br/>
                    <input id="wd-assign-to" defaultValue={"Everyone"} />
                </td><br/>
                
                <td align="left" valign="top">
                    <label htmlFor="wd-due-date">Due</label><br/>
                    <input type="date"
                    id="wd-due-date"
                    defaultValue={assignment.due}/><br/>
                </td><br/>

                <td align="left" valign="top">
                    <label htmlFor="wd-available-from">Available from</label><br/>
                    <input type="date"
                    id="wd-available-from"
                    defaultValue={assignment.availableFrom}/><br/>
                </td>
                <td align="left" valign="top">
                    <label htmlFor="wd-available-until">Until</label><br/>
                    <input type="date"
                    id="wd-available-until"
                    defaultValue={assignment.availableUntil}/><br/>
                </td><br/>
                <hr />
                <button>Save</button>
                <button>Preview</button>
                <button>Cancel</button>
            </td>
        </tr>
      </table>
    </div>
  );
}