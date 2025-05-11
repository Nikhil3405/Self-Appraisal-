import React from 'react';
interface TeachingActivity{
  PerformanceID: number;
  AcademicYear: string;
  Semester: string;
  CourseCode: string;
  Level: string;
  TeachingMode: string;
  ClassesPerWeek: string;
  SelfAppraisalScore: number;
}
interface StudentPerformance {
  CourseName: string;
  CourseCode: string;
  StudentsRegistered: string;
  StudentsPassed: string;
  NotEligible: string;
  PassPercentage: string;
  SelfAppraisalScore: string;
}
interface RemedialClass {
  Semester: string;
  CourseType: string;
  CourseName: string;
  CourseCode: string;
  TotalClasses: string;
  TotalHoursSpent: string;
  SelfAppraisalScore: string;
}
interface TeachingMethodology {
  Semester: string;
  course: string;
  ShortDescription: string;
  SelfAppraisalScore: string;
}
interface CounselingRecord {
  Semester: string;
  StudentsMentored: string;
  ActionTaken: string;
  Outcome: string;
  SelfAppraisalScore: string;
}
interface IndustryInteraction {
  IndustryName: string;
  IndustryContactDetails: string;
  InteractionDate: string;
  ActivitiesPlanned: string;
  SelfAppraisalScore: string;
}
interface IndustryVisit {
  sem: string;
  industryname: string;
  visitdate: string;
  numberofstudents: string;
  outcome: string;
  SelfAppraisalScore: string;
}
interface ExamDuty {
  ID: number;
  ExamDutyType: string;
  DutiesAssigned: string;
  Squad?: string;
  RoomInvigilation?: string;
  Relief?: string;
  DCS?: string;
  BOE?: string;
  Invigilation?: string;
  Coordination?: string;
  QuestionPaperSetting?: string;
  SelfAppraisalScore: string;
}
interface PartialDelivery {
  IndustryExpert: string;
  Course: string;
  DeliveryDate: string;
  SelfAppraisalScore: string;
}
interface StudentFeedback {
  score: string;
}
interface DayToDayActivity {
  Particulars: string;
  SelfAppraisalScore: string;
}
interface MiniProject {
  Particulars: string;
  SelfAppraisalScore: string;
}
interface AcademicFile {
  Details: string;
  SelfAppraisalScore: string;
}
interface Category1{
  teachingactivities: TeachingActivity[];
  studentperformance: StudentPerformance[];
  remedialclass: RemedialClass[];
  teachingmethodology: TeachingMethodology[];
  counselingrecord: CounselingRecord[];
  industryinteraction: IndustryInteraction[];
  industryvisit: IndustryVisit[];
  examduty: ExamDuty[];
  partialdelivery: PartialDelivery[];
  studentfeedback: StudentFeedback;
  daytodayactivity: DayToDayActivity[];
  miniproject: MiniProject[];
  academicfile: AcademicFile[];
}
interface CategoryData {
  title: string;
  data: Category1[]; // Accept any array of objects
}
type CategoryData1 = 
  | TeachingActivity[]
  | StudentPerformance[]
  | RemedialClass[]
  | TeachingMethodology[]
  | CounselingRecord[]
  | IndustryInteraction[]
  | IndustryVisit[]
  | ExamDuty[]
  | PartialDelivery[]
  | DayToDayActivity[]
  | MiniProject[]
  | AcademicFile[]
  | StudentFeedback[];
interface FacultyReportProps {
  categories: CategoryData[];
}

const FacultyReportCategory1: React.FC<FacultyReportProps> = ({ categories }) => {
  
  const renderTable = (title: string, data: CategoryData1) => {
    switch (title.toLowerCase()) {
      case 'teachingactivities':
        return (
        <div>
        <b >
          A. Lectures, Tutorials, Practical, Contact hours (At least for the past 3 years ODD and EVEN semesters):<br/>
          [20 points per Lecture and Tutorial subject for taking 100% classes and 50 points for covering 100 percent syllabus, 20 points for Practical of 3 batches covering all the experiments from the lab syllabus]
          <br />
          Maximum Score: 50
        </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Course Code</th>
                <th>Teaching Mode</th>
                <th>Classes Per Week</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as TeachingActivity[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.CourseCode}</td>
                  <td>{row.TeachingMode}</td>
                  <td>{row.ClassesPerWeek}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
        </div>
        );
  
      case 'studentperformance':
        return (
          <div>
        <b>
        B. Performance of students in your Lab and/or theory classes (Previous 3 Years for odd and even semesters):<br/>
        [Self-appraisal score: if pass percentage (i) 40% to 50% - 5 (ii) 51% to 60% - 6 (iii) 61% to 70% - 7 
        (iv) 71% to 80% - 8 (v) 81% to 90% - 9 (vi) above 90% - 10]
<br/>Maximum Score: 50 
      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Course Name</th>
                <th>Students Registered</th>
                <th>Students Passed</th>
                <th>Pass Percentage</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as StudentPerformance[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.CourseName}</td>
                  <td>{row.StudentsRegistered}</td>
                  <td>{row.StudentsPassed}</td>
                  <td>{row.PassPercentage}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
            </table>
            <br/>
            </div>
        );
  
      case 'remedialclass':
        return (
          <div>
 <b>               
        C. Remedial classes for weak students / Extra classes/tutorials conducted<br/>

 (Previous 3 years and this semester to improve student’s performance) 
 <br/>[Note:  Remedial class = classes conducted for Academically weak students for 
their improvement<br/>
 Tutorial= Classes conducted specifically to solve more problems (other than 
regular classes) <br/>
 Extra class= Over and above 42 Hours for theory/ over and above 14 lab Sessions]<br/>Maximum Score: 20     </b>

          <table>
            <thead> 
              <tr>
                <th>Sl. No.</th>
                <th>Semester</th>
                <th>Course Type</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Total Classes</th>
                <th>Total Hours Spent</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as RemedialClass[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Semester}</td>
                  <td>{row.CourseType}</td>
                  <td>{row.CourseName}</td>
                  <td>{row.CourseCode}</td>
                  <td>{row.TotalClasses}</td>
                  <td>{row.TotalHoursSpent}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
              </tbody>
          </table>
          <br/>
          </div>
        );
      
      case 'teachingmethodology':
        return (
          <div>
<b>                                                         
        D. Use of Participatory and Innovative Teaching-Learning methodologies, Updating of 
Subject Content, Course Improvement etc.,<br/>
[ICT based teaching material = 10 points each, Number of Interactive courses = 
10 points each, Number of participatory learning modules = 5 points each, 
Demonstration models =  5 points each] <br/>Maximum Score: 20      </b> 

          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Semester</th>
                <th>Course</th>
                <th>Description</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as TeachingMethodology[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Semester}</td>
                  <td>{row.course}</td>
                  <td>{row.ShortDescription}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      case 'counselingrecord':
        return (
          <div>
      <b>
      E. Counseling and Mentoring the students in the present semester<br/>
      Maximum Score: 20      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Semester</th>
                <th>Students Mentored</th>
                <th>Action Taken</th>
                <th>Outcome</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as CounselingRecord[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Semester}</td>
                  <td>{row.StudentsMentored}</td>
                  <td>{row.ActionTaken}</td>
                  <td>{row.Outcome}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      case 'industryinteraction':
        return (
          <div>
      <b>
      F. Involvement in arranging Industry Academic Interactions <br/>
      Maximum Score: 20      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Industry Name</th>
                <th>Contact Details</th>
                <th>Date</th>
                <th>Activities Planned</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as IndustryInteraction[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.IndustryName}</td>
                  <td>{row.IndustryContactDetails}</td>
                  <td>{row.InteractionDate ? row.InteractionDate.split("T")[0] : row.InteractionDate}</td>
                  <td>{row.ActivitiesPlanned}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      case 'industryvisit':
        return (
          <div>
      <b>
        G. Involvement in arranging Industrial /field visits with students<br/>
      Maximum Score: 30      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Semester</th>
                <th>Industry Name</th>
                <th>Date</th>
                <th>Students Count</th>
                <th>Outcome</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as IndustryVisit[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.sem}</td>
                  <td>{row.industryname}</td>
                  <td>{row.visitdate ? row.visitdate.split("T")[0] : row.visitdate}</td>
                  <td>{row.numberofstudents}</td>
                  <td>{row.outcome}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );
      
      case 'examduty':
        return (
<div>
  <b>
    H. Examination Duties Assigned & Performed<br />
    Maximum Score = 20, 2 points for each exam-related work
  </b>

  <table>
    <thead>
      <tr>
        <th >Sl. No.</th>
        <th >Type of Examination duties</th>
        <th >Mention the type of Duties assigned</th>
        <th >Self-Appraisal Score</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(data) && (data as ExamDuty[]).map((item, idx: number) => {
        let dutiesDescription = "";

        if (idx === 0) {
          dutiesDescription = item.DutiesAssigned || "";
        } else if (idx === 1) {
          dutiesDescription = `
            Mention in Numbers:\n
            Squad: ${item.Squad ?? ""}\n
            Room invigilation: ${item.RoomInvigilation ?? ""}\n
            Relief: ${item.Relief ?? ""}\n
            DCS: ${item.DCS ?? ""}\n
            BOE: ${item.BOE ?? ""}
          `;
        } else if (idx === 2) {
          dutiesDescription = `
            Mention in Numbers:\n
            Invigilation: ${item.Invigilation ?? ""}\n
            Coordination: ${item.Coordination ?? ""}\n
            Question Paper setting: ${item.QuestionPaperSetting ?? ""}
          `;
        }

        return (
          <tr key={item.ID}>
            <td >{idx + 1}</td>
            <td >{item.ExamDutyType}</td>
            <td style={{ textAlign: "left", whiteSpace: "pre-line",lineHeight: "10px" }}>
              {dutiesDescription.trim()}
            </td>
            <td >{item.SelfAppraisalScore}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <br/>
</div>

        );

      case 'partialdelivery':
        return (
          <div>
      <b>
        I. Industry involvement in Partial delivery in your courses<br/>
        Maximum Score: 20
      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Industry Expert</th>
                <th>Course</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as PartialDelivery[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.IndustryExpert}</td>
                  <td>{row.Course}</td>
                  <td>{row.DeliveryDate ? row.DeliveryDate.split("T")[0] : row.DeliveryDate}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

       case 'studentfeedback':
        return (
          <div>
        <b>
          J. Student Feedback<br/>
          [Take the average of the feedback given by students on all subjects taught]
        <br/>Maximum Score: 10
        </b>
        <table> 
  <thead>
    <tr>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{(Array.isArray(data) && (data as StudentFeedback[])[0].score) ?? 'N/A'}</td>
    </tr>
  </tbody>
</table>
          <br/>
          </div>
        );

      case 'daytodayactivity':
        return (
          <div>
      <b>
        K. Day to Day activity records maintenance in the department <br/>
        Maximum Score: 10, Attendance register: 5, Blue books: 5,etc
      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Particulars</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as DayToDayActivity[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Particulars}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      case 'miniproject':
        return (
          <div>
        <b>
        L. Guiding of Mini Projects<br/>
      Maximum Score 10, 5 per project</b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Particulars</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as MiniProject[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Particulars}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      case 'academicfile':
        return (
          <div>
      <b>
        M. Maintenance of Personal Academic File<br/>

        [Documentation of all details of: CIE/Test Question Papers, Scheme, Assignments given and evaluated,
        additional work schedule, lesson plan and other relevant documents: Each document = 2 points]
        <br/>Maximum Score: 20
      </b>
          <table>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Details</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && (data as AcademicFile[]).map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.Details}</td>
                  <td>{row.SelfAppraisalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          </div>
        );

      default:
        return <div>No Table Structure Defined for {title}</div>;
    }
  };
  
  
  return (
    <div className="print-content">
      <h2 style={{textAlign: "center"}}>PART B: ACADEMIC PERFORMANCE INDICATOR (API)</h2>
      <h3 style={{textAlign: "center"}}>[Teaching, Learning & Evaluation Activities]</h3>
        <h3 style={{textAlign: "center"}}>CATEGORY I:</h3><h3 style={{textAlign: "center"}}> TEACHING, LEARNING & EVALUATION ACTIVITIES</h3>

{categories.map((category, index) => (
  <div key={index}>
    {renderTable(category.title, category.data as unknown as CategoryData1)}

  </div>
))}

    </div>
  );
};

export default FacultyReportCategory1;
