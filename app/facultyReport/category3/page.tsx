import React from 'react';
interface PublishedPaper {
  PaperTitle: string;
  JournalName: string;
  ISSN_ISBN: string;
  PeerReviewedOrImpactFactor: string;
  NumberOfCoAuthors: number;
  IsMainAuthor: string;
  JournalType: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  SelfAppraisalScore: number;
}
interface BookChapter {
  BookChapterTitle: string;
  PublisherDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  IsMainAuthor: string;
  SelfAppraisalScore: number;
}
interface AuthoredBook {
  BookTitle: string;
  PublisherDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  PublicationLevel: "International" | "National/Local" | " ";
  AuthorRole:  "Main Author" | "Co-author/Editor" | " ";
  SelfAppraisalScore: number;
}
interface ConferencePaper {
  PaperTitle: string;
  ConferenceDetails: string;
  ISSN_ISBN: string;
  NumberOfCoAuthors: number;
  AuthorRole:  "Main Author" | "Co-author" | " ";
  SelfAppraisalScore: number;
}
interface UGProject {
  ProjectTitle: string;
  UGCompletionPercent: number;
  PaperPublished: string;
  PatentPublished: string;
  IsFunded: string;
  SelfAppraisalScore: number;
}
interface Patent {
  PatentTitle: string;
  FilingDate: string;
  PatentType: "Indian" | "Foreign";
  Status:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore: number;
}
interface DesignPatent {
  DesignTitle: string;
  FilingDate: string;
  PatentType: "Indian" | "Foreign";
  Status:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore: number;
}
interface Copyright {
  CopyrightTitle: string;
  RegistrationDate: string;
  CopyrightType: "Indian" | "Foreign";
  SelfAppraisalScore: string;
}
interface FundedProject {
  ProjectTitle: string;
  FundingAgency: string;
  SanctionYear: string;
  ProjectPeriod: string;
  AmountMobilized: number;
  ProjectStatus: "Completed" | "Ongoing";
  SelfAppraisalScore: number;
}
interface ResearchGuidance {
  Degree: "Ph.D" | "M.Tech" | string;
  CandidateName: string;
  ThesisTitle: string;
  University: string;
  Status: string;
  SelfAppraisalScore: number;
}
interface ConsultancyWork {
  ConsultancyTitle: string;
  StartDate: string;
  EndDate: string;
  ClientType: string;
  NatureOfWork: string;
  Amount: number;
  SelfAppraisalScore: number;
}
interface TrainingProgram {
  ProgramTitle: string;
  Duration: string;
  OrganizedBy: string;
  ProgramType: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  SelfAppraisalScore: number;
}
interface Project3M {
  ProjectTitle: string;
  ProjectStatus: "Ongoing" | "Completed";
  TRLLevel: number;
  SelfAppraisalScore: number;
}
interface ProfessionalBodyActivity {
  ProfessionalBodyName: string;
  ActivityType: string;
  SelfAppraisalScore: string;
}
interface DisciplinaryChargeRow {
  Section: "Institutional" | "Society";
  Details: string;
  Remarks: string;
}
interface ScannedDocument {
    id?: number;
    documentType: string;
    documentTitle: string;
    uploadDate: string;
    fileUrl: string;
    fileName?: string;
    status: "Pending" | "Verified" | "Rejected";
    remarks: string;
}
interface Category3{
  papers: PublishedPaper[];
  chapters: BookChapter[];
  books: AuthoredBook[];
  conferencePapers: ConferencePaper[];
  projects: UGProject[];
  patents: Patent[];
  designPatents: DesignPatent[];
  copyrights: Copyright[];
  fundProjects: FundedProject[];
  guidanceList: ResearchGuidance[];
  consultancyWorks: ConsultancyWork[];
  programs: TrainingProgram[];
  developedprojects: Project3M[];
  activities: ProfessionalBodyActivity[];
  data: DisciplinaryChargeRow[];
  documents: ScannedDocument[];
}
interface CategoryData {
  title: string;
  data: Category3[]; // Accept any array of objects
}
type CategoryData3 = | PublishedPaper[]
| BookChapter[] | AuthoredBook[] | ConferencePaper[] | 
UGProject[] | Patent[] | DesignPatent[] | Copyright[] | 
FundedProject[] | ResearchGuidance[] | ConsultancyWork[] |
 TrainingProgram[] | Project3M[] | ProfessionalBodyActivity[] 
 | DisciplinaryChargeRow[] | ScannedDocument[];
interface FacultyReportProps {
  categories: CategoryData[];
}

const FacultyReportCategory3: React.FC<FacultyReportProps> = ({ categories }) => {
  
  const renderTable = (title: string, data: CategoryData3) => {
    switch (title) {
        case 'papers':
          return (
            <div>
              <b>
        A. Published Papers in Journals (SCI/Scopus/Web of Science)
              <br/>[Q1/Q2: 20 pts, Q3: 15 pts, Q4/Others: 5 pts] <br/>Maximum Score: 100
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Journal Name</th>
                    <th>ISSN_ISBN</th>
                    <th>Peer Reviewed / Impact Factor</th>
                    <th>Number of Co-Authors</th>
                    <th>Are You Main Author?</th>
                    <th>Journal Type</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as PublishedPaper[]).map((row, idx) => (
                    <tr key={idx}>                
                      <td>{idx + 1}</td>
                      <td>{row.PaperTitle}</td>
                      <td>{row.JournalName}</td>
                      <td>{row.ISSN_ISBN}</td>
                      <td>{row.PeerReviewedOrImpactFactor}</td>
                      <td>{row.NumberOfCoAuthors}</td>
                      <td>{row.IsMainAuthor}</td>
                      <td>{row.JournalType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'chapters':
          return (
            <div>
              <b>
        B. Published Full Papers in Book Chapters in SCOPUS/WOS only
              <br/>
         [First Author: 20, Co-author: 15 per book chapter]<br/>Maximum Score: 100
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Publisher Details</th>
                    <th>ISSN_ISBN</th>
                    <th>Number of Co-Authors</th>
                    <th>Are You Main Author?</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as BookChapter[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.BookChapterTitle}</td>
                      <td>{row.PublisherDetails}</td>
                      <td>{row.ISSN_ISBN}</td>
                      <td>{row.NumberOfCoAuthors}</td>
                      <td>{row.IsMainAuthor}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'books':
          return (
            <div>
              <b>
                C. Authored Books
              <br/>[International = 50, National/Local = 20, Co-author/Editor = 20, Main Author = 50]
        <br />
        Maximum Score: 100
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Publisher Details</th>
                    <th>ISSN_ISBN</th>
                    <th>Number of Co-Authors</th>
                    <th>Publication Type</th>
                    <th>Author Role</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as AuthoredBook[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.BookTitle}</td>
                      <td>{row.PublisherDetails}</td>
                      <td>{row.ISSN_ISBN}</td>
                      <td>{row.NumberOfCoAuthors}</td>
                      <td>{row.PublicationLevel}</td>
                      <td>{row.AuthorRole}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'conferencePapers':
          return (
            <div>
              <b>
        D. Published Full Papers / Presented in Conference Proceedings
              <br/>Peer-reviewed & recognized by professional societies <br />
        [First author – 20 per paper, Co-author – 10 per paper]<br/>
        Maximum Score: 100 
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Conference Details</th>
                    <th>ISSN_ISBN</th>
                    <th>Number of Co-Authors</th>
                    <th>Author Role</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ConferencePaper[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.PaperTitle}</td>
                      <td>{row.ConferenceDetails}</td>
                      <td>{row.ISSN_ISBN}</td>
                      <td>{row.NumberOfCoAuthors}</td>
                      <td>{row.AuthorRole}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'projects':
          return (
            <div>
              <b>
                E. Project Works (UG)
              <br/>[5 per paper/patent out of project or with funding (Dr. AIT/others), otherwise 2 per project.]
        <br />Maximum Score: 20
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Project Title</th>
                    <th>UG Completion Percentage</th>
                    <th>Paper Published?</th>
                    <th>Patent Published?</th>
                    <th>Fund Received?</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as UGProject[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ProjectTitle}</td>
                      <td>{row.UGCompletionPercent}</td>
                      <td>{row.PaperPublished}</td>
                      <td>{row.PatentPublished}</td>
                      <td>{row.IsFunded}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'patents':
          return (
            <div>
              <b>
                F. Patents
              <br/>[Granted = 5, Published = 4, Filed = 3]
        <br />
        Maximum Score: 10
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as Patent[]).map((row, idx) => ( // TODO: Fix this
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.PatentTitle}</td>
                      <td>{row.FilingDate? row.FilingDate.split("T")[0] : row.FilingDate}</td>
                      <td>{row.PatentType }</td>
                      <td>{row.Status}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'designPatents':
          return (
            <div>
              <b>
                G. Design Patents
              <br/>[Granted = 5, Published = 4, Filed = 3]
        <br />
        Maximum Score: 5
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as DesignPatent[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.DesignTitle}</td>
                      <td>{row.FilingDate?row.FilingDate.split("T")[0] : row.FilingDate}</td>
                      <td>{row.PatentType}</td>
                      <td>{row.Status}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'copyrights':
          return (
            <div>
              <b>
                H. Copyrights
              <br/>Maximum Score: 5
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Date of Registration</th>
                    <th>Type</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as Copyright[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.CopyrightTitle}</td>
                      <td>{row.RegistrationDate? row.RegistrationDate.split("T")[0]: row.RegistrationDate}</td>
                      <td>{row.CopyrightType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'fundProjects':
          return (
            <div>
              <b>
                I. Funded Research Projects
              <br/>[30 lakhs and above – 25, 05 to 30 lakhs – 20, 01 to 5 lakhs – 15, less than 1 lakh – 5]
        <br />
        Maximum Score: 50
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Agency</th>
                    <th>Year of Sanction</th>
                    <th>Project Period</th>
                    <th>Grant</th>
                    <th>Status</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as FundedProject[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ProjectTitle}</td>
                      <td>{row.FundingAgency}</td>
                      <td>{row.SanctionYear}</td>
                      <td>{row.ProjectPeriod}</td>
                      <td>{row.AmountMobilized}</td>
                      <td>{row.ProjectStatus}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'guidanceList':
          return (
            <div>
              <b>
                J. Research Guidance
              <br/>[Ph.D Guidance – 10 per candidate, M.Tech – 5 per candidate]
        <br />
        Maximum Score: 25
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Degree</th>
                    <th>Candidate Name</th>
                    <th>Thesis Title</th>
                    <th>University</th>
                    <th>Status</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ResearchGuidance[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.Degree}</td>
                      <td>{row.CandidateName}</td>
                      <td>{row.ThesisTitle}</td>
                      <td>{row.University}</td>
                      <td>{row.Status}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'consultancyWorks':
          return (
            <div>              
              <b> 
        K. Consultancy Works and IRG
              <br/>[3 Lakhs and above – 10, 1 to 3 Lakhs – 5, 10,000 to 1 Lakh – 2] <br />
        Maximum Score: 25
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Client Type</th>
                    <th>Nature of Work</th>
                    <th>Amount</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ConsultancyWork[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ConsultancyTitle}</td>
                      <td>{row.StartDate}</td>
                      <td>{row.EndDate}</td>
                      <td>{row.ClientType}</td>
                      <td>{row.NatureOfWork}</td>
                      <td>{row.Amount}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'programs':
          return (
            <div>
              <b>
        L. Training Courses, Pedagogy, FDPs
              <br/>[Certification courses (NPTEL/SWAYAM/Udemy/Coursera) – 3, FDP – 2, Workshop – 2, Pedagogy – 2]
        <br />
        Maximum Score: 25
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Organized By</th>
                    <th>Type</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as TrainingProgram[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ProgramTitle}</td>
                      <td>{row.Duration}</td>
                      <td>{row.OrganizedBy}</td>
                      <td>{row.ProgramType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'developedprojects':
          return (
            <div>
              <b>
        M. Innovative Developed Projects
              <br/>[5 per project for TRL &gt; 7, 3 for TRL &gt; 4, 2 for TRL ≤ 4] <br />
        Maximum Score: 25
              </b>
              <div style={{ marginTop: "10px" }}>
          <p><strong>Technology Readiness Levels (TRL):</strong></p>
          <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
            <li>TRL 1 — Basic principles observed</li>
            <li>TRL 2 — Technology concept formulated</li>
            <li>TRL 3 — Experimental proof of concept</li>
            <li>TRL 4 — Technology validated in lab</li>
            <li>TRL 5 — Technology validated in relevant environment</li>
            <li>TRL 6 — Technology demonstrated in relevant environment</li>
            <li>TRL 7 — System prototype demonstration in operational environment</li>
            <li>TRL 8 — System complete and qualified</li>
            <li>TRL 9 — Actual system proven in operational environment</li>
          </ul>
        </div>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>TRL</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as Project3M[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ProjectTitle}</td>
                      <td>{row.ProjectStatus}</td>
                      <td>{row.TRLLevel}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'activities':
          return (
            <div>
              <b>
        N. Activities in the Recognized Professional Bodies
              <br/>[5 per professional body activity] <br />
        Maximum Score: 10
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Name of the Professional Body</th>
                    <th>Type of Activity</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ProfessionalBodyActivity[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ProfessionalBodyName}</td>
                      <td>{row.ActivityType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'data':
          return (
            <div>
              <b>
        O. Disciplinary Charges Faced, If Any
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Section</th>
                    <th>Details</th>
                    <th>Remarks</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as DisciplinaryChargeRow[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.Section}</td>
                      <td>{row.Details}</td>
                      <td>{row.Remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
          case 'documents':
            return (
              <div style={{ marginTop: "50px" }}>
                <b>
                 LIST OF ENCLOSURES:
                </b>
                {Array.isArray(data) && (data as ScannedDocument[]).map((row, idx) => (
                  <div key={idx}>
                    <p>{idx + 1}. {row.documentTitle}</p>
                  </div>
                ))}
                    <br/>
                  </div>
                );
        default:
          return <div>No Table Structure Defined for {title}</div>;
    }
  };
  return (
<div className='print-content'>
  <h3 style={{ textAlign: "center" }}>CATEGORY III:</h3>
  <h3 style={{ textAlign: "center" }}>
    RESEARCH, PUBLICATIONS & ACADEMIC CONTRIBUTION RELATED ACTIVITIES
  </h3>


  {categories.map((category, index) => (
    <div key={index}>
      {renderTable(category.title, category.data as unknown as CategoryData3)}
</div>
  ))}
  <div style={{ marginTop: "100px" }}>
  <p>
    <b>
      I certify that the information provided is correct as per records available with the
      Institute and/or documents enclosed with the duly filled proforma.
    </b>
  </p>

  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "150px" }}>
    <p>
      <b>Dated:</b> {new Date().toLocaleDateString()}
    </p>
    <p>
      <b>Signature of the faculty:</b>
    </p>
  </div>
</div>
</div>
  );
};

export default FacultyReportCategory3;
