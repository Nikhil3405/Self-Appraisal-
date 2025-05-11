import React from 'react';
interface ActivityRecord {
  ActivityDetails: string;
  ActivityType: string;
  SelfAppraisalScore: string;
}
interface CommitteeActivity {
  activityType: string;
  SelfAppraisalScore: number;
}
interface ArticleContribution {
  ArticleDetails: string;
  DatePublished: string;
  SelfAppraisalScore: string;
}
interface OutreachResponsibility {
  Responsibility: string;
  SelfAppraisalScore: string;
}
interface SeminarWorkshop {
  EventDetails: string;
  EventDate: string;
  SelfAppraisalScore: string;
}
interface ResourceParticipation {
  EventDetails: string;
  EventDate: string;
  SelfAppraisalScore: string;
}
interface OutreachActivity {
  ActivityDetails: string;
  ActivityDate: string;
  SelfAppraisalScore: string;
}
interface ProfessionalBodyActivity {
  activityType: string;
  SelfAppraisalScore: string;
}
interface Fellowship {
  Awards: string;
  SelfAppraisalScore: string;
}
interface Honor {
  HonorTitle: string;
  ConferredDate: string;
  ConferredBy: string;
  IsPaid: string; // Yes or No
  SelfAppraisalScore: string;
}
interface Category2{
  activityrecords: ActivityRecord[];
  committeeResponsibilities: CommitteeActivity[];
  articles: ArticleContribution[];
  outreachResponsibilities: OutreachResponsibility[];
  seminars: SeminarWorkshop[];
  resourceParticipations: ResourceParticipation[];
  outreachActivities: OutreachActivity[];
  professionalBodies: ProfessionalBodyActivity[];
  fellowships: Fellowship[];
  honors: Honor[];
}
interface CategoryData {
  title: string;
  data: Category2[]; // Accept any array of objects
}
type CategoryData2 = | ActivityRecord[]
| CommitteeActivity[]
| ArticleContribution[]
| OutreachResponsibility[]
| SeminarWorkshop[]
| ResourceParticipation[]
| OutreachActivity[]
| ProfessionalBodyActivity[]
| Fellowship[]
| Honor[];
interface FacultyReportProps {
  categories: CategoryData[];
}

const FacultyReportCategory2: React.FC<FacultyReportProps> = ({ categories }) => {
  
  const renderTable = (title: string, data: CategoryData2) => {
    switch (title) {
        case 'activityrecords':
          return (
            <div>              
              <b >
                A. Co-curricular, Extra-curricular, Professional development related Activities
              <br/>Maximum Score: 20 @ 5 mark each
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Activity Details</th>
                    <th>Type of Activity (Dept./College/Univ.)</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ActivityRecord[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ActivityDetails}</td>
                      <td>{row.ActivityType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'committeeResponsibilities':
          return (
            <div>
              <b>
                B. Academic and Administrative Committees and Responsibilities
              <br/>Maximum Score: 10
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Type of Activity Co-Curricular Activities 
                    <br/>(Departmental/College / university level)</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as CommitteeActivity[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.activityType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'articles':
          return (
            <div>
              <b>
                C. Contribution of Articles to College / Department Newsletters / Magazines
              <br/>Maximum Score: 15 @ 5 marks per article
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Article Details</th>
                    <th>Date</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ArticleContribution[]).map((row, idx) => (
                    <tr key={idx}>                
                      <td>{idx + 1}</td>
                      <td>{row.ArticleDetails}</td>
                      <td>{row.DatePublished? row.DatePublished.split("T")[0] : row.DatePublished}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'outreachResponsibilities':
          return (
            <div>
              <b>
                D. Academic and Administrative Outreaches and Responsibilities
              <br/>[BoS, BoE, Academic Council Members, LIC, NBA, AICTE, UGC, NAAC etc]
        <br />
        Maximum Score: 10 @ 5 marks each
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Responsibility</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as OutreachResponsibility[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.Responsibility}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'seminars':
          return (
            <div>
              <b>
                E. Seminars / Workshops / Technical Talks / Guest Lectures / FDP Arranged
              <br/>Maximum Score: 10 @ 5 mark each
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as SeminarWorkshop[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.EventDetails}</td>
                      <td>{row.EventDate? row.EventDate.split("T")[0] : row.EventDate}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'resourceParticipations':
          return (
            <div>              
              <b>
                F. Participation as a Resource Person in Symposium, Conferences, FDPs/Workshops/Other Events
              <br/>Maximum Score: 10 (5 marks per event)
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ResourceParticipation[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.EventDetails}</td>
                      <td>{row.EventDate? row.EventDate.split("T")[0] : row.EventDate}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'outreachActivities':
          return (
            <div>
              <b>
                G. Participation in Outreach Activities
                <br/>[e.g. NCC, NSS, Reviewer, Conference Chair, Technical Committee Member, Industry Rep, Red Cross, Rotary, Student Clubs, etc.]
 <br />Maximum Score: 10 [5 per activity] 
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as OutreachActivity[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.ActivityDetails}</td>
                      <td>{row.ActivityDate? row.ActivityDate.split("T")[0] : row.ActivityDate}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'professionalBodies':
          return (
            <div>
              <b>
                H. Member of Professional Bodies
                <br/>Maximum Score: 5
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Type of Activity Co-Curricular Activities<br/>
                    (Departmental/College / university level)</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as ProfessionalBodyActivity[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.activityType}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'fellowships':
          return (
            <div>
              <b>
                I. Fellowships / Awards
                <br/>[International Award/Fellowship – 5, National Level Award – 3, Best Paper – 3]
        <br /> Maximum Score: 5
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Fellowships / Awards</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as Fellowship[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.Awards}</td>
                      <td>{row.SelfAppraisalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              );
        case 'honors':
          return (
            <div>
              <b>
                J. Honors Conferred for the Contribution (Unpaid Only)
                <br/>Honors by Government, Statutory Body, Industry, University
        <br />Maximum Score: 5
              </b>
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Honors / Awards</th>
                    <th>When Conferred</th>
                    <th>By Whom</th>
                    <th>Not Paid (Yes/No)</th>
                    <th>Self-Appraisal Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && (data as Honor[]).map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.HonorTitle}</td>
                      <td>{row.ConferredDate? row.ConferredDate.split("T")[0] : row.ConferredDate}</td>
                      <td>{row.ConferredBy}</td>
                      <td>{row.IsPaid}</td>
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
<div className='print-content'>
  <h3 style={{ textAlign: "center" }}>CATEGORY II:</h3>
  <h3 style={{ textAlign: "center" }}>
    CO-CURRICULAR, EXTRA-CURRICULAR, PROFESSIONAL DEVELOPMENT RELATED ACTIVITIES
  </h3>


  {categories.map((category, index) => (
    <div key={index}>
      {renderTable(category.title, category.data as unknown as CategoryData2)}
    </div>
  ))}
</div>


  );
};

export default FacultyReportCategory2;
