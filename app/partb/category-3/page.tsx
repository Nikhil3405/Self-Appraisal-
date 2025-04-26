"use client";

import Category3A from "../../component/category3/a";
import Category3B from "../../component/category3/b";
import Category3C from "../../component/category3/c";
import Category3D from "../../component/category3/d";
import Category3E from "../../component/category3/e";
import Category3F from "../../component/category3/f";
import Category3G from "../../component/category3/g";
import Category3H from "../../component/category3/h";
import Category3I from "../../component/category3/i";
import Category3J from "../../component/category3/j";
import Category3K from "../../component/category3/k";
import Category3L from "../../component/category3/l";
import Category3N from "../../component/category3/n";
import Category3M from "../../component/category3/m";
import Category3O from "../../component/category3/o";
import TeacherDocumentUpload from "../../component/category3/p"

import Navbar from "@/app/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface PublishedPaper {
  title: string;
  journalName: string;
  issnIsbn: string;
  peerReviewed: string;
  coAuthors: number;
  mainAuthor: string;
  journalType: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  score: number;
  PaperTitle?: string;
  JournalName?: string;
  ISSN_ISBN?: string;
  PeerReviewedOrImpactFactor?: string;
  NumberOfCoAuthors?: number;
  IsMainAuthor?: string;
  JournalType?: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  SelfAppraisalScore?: number;
}
interface BookChapter {
  title: string;
  publisherDetails: string;
  issnIsbn: string;
  coAuthors: number;
  isMainAuthor: string;
  score: number;
  BookChapterTitle?: string;
  PublisherDetails?: string;
  ISSN_ISBN?: string;
  NumberOfCoAuthors?: number;
  IsMainAuthor?: string;
  SelfAppraisalScore?: number;
}
interface AuthoredBook {
  title: string;
  publisherDetails: string;
  issnIsbn: string;
  coAuthors: number;
  publicationType: "International" | "National/Local" | " ";
  role: "Main Author" | "Co-author/Editor" | " ";
  score: number;
  BookTitle?: string;
  PublisherDetails?: string;
  ISSN_ISBN?: string;
  NumberOfCoAuthors?: number;
  PublicationLevel?: "International" | "National/Local" | " ";
  AuthorRole?:  "Main Author" | "Co-author/Editor" | " ";
  SelfAppraisalScore?: number;
}
interface ConferencePaper {
  title: string;
  conferenceDetails: string;
  issnIsbn: string;
  coAuthors: number;
  authorRole: "Main Author" | "Co-author" | " ";
  score: number;
  PaperTitle?: string;
  ConferenceDetails?: string;
  ISSN_ISBN?: string;
  NumberOfCoAuthors?: number;
  AuthorRole?:  "Main Author" | "Co-author" | " ";
  SelfAppraisalScore?: number;
}
interface UGProject {
  projectTitle: string;
  ugPercentageCompletion: number;
  hasPaper: string;
  hasPatent: string;
  hasFunding: string;
  score: number;
  ProjectTitle?: string;
  UGCompletionPercent?: number;
  PaperPublished?: string;
  PatentPublished?: string;
  IsFunded?: string;
  SelfAppraisalScore?: number;
}
interface Patent {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  status: "Filed" | "Published" | "Awarded";
  score: number;
  PatentTitle?: string;
  FilingDate?: string;
  PatentType?: "Indian" | "Foreign";
  Status?:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore?: number;
}
interface DesignPatent {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  status: "Filed" | "Published" | "Awarded";
  score: number;
  DesignTitle?: string;
  FilingDate?: string;
  PatentType?: "Indian" | "Foreign";
  Status?:  "Filed" | "Published" | "Awarded";
  SelfAppraisalScore?: number;
}
interface Copyright {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  score: string;
  CopyrightTitle?: string;
  RegistrationDate?: string;
  CopyrightType?: "Indian" | "Foreign";
  SelfAppraisalScore?: string;
}
interface FundedProject {
  title: string;
  agency: string;
  year: string;
  period: string;
  grant: string;
  status: "Completed" | "Ongoing";
  score: number;
  ProjectTitle?: string;
  FundingAgency?: string;
  SanctionYear?: string;
  ProjectPeriod?: string;
  AmountMobilized?: number;
  ProjectStatus?: "Completed" | "Ongoing";
  SelfAppraisalScore?: number;
}
interface ResearchGuidance {
  degree: "Ph.D" | "M.Tech" | string;
  candidateName: string;
  thesisTitle: string;
  university: string;
  status: string;
  score: number;
  Degree?: "Ph.D" | "M.Tech" | string;
  CandidateName?: string;
  ThesisTitle?: string;
  University?: string;
  Status?: string;
  SelfAppraisalScore?: number;
}
interface ConsultancyWork {
  title: string;
  startDate: string;
  endDate: string;
  clientType: string; // Government/Private/Institutional
  natureOfWork: string;
  amount: number;
  score: number;
  ConsultancyTitle?: string;
  StartDate?: string;
  EndDate?: string;
  ClientType?: string;
  NatureOfWork?: string;
  Amount?: number;
  SelfAppraisalScore?: number;
}
interface TrainingProgram {
  title: string;
  duration: string;
  organizedBy: string;
  type: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  score: number;
  ProgramTitle?: string;
  Duration?: string;
  OrganizedBy?: string;
  ProgramType?: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  SelfAppraisalScore?: number;
}
interface Project3M {
  title: string;
  status: "Ongoing" | "Completed";
  trl: number | null;
  score: number;
  ProjectTitle?: string;
  ProjectStatus?: "Ongoing" | "Completed";
  TRLLevel?: number;
  SelfAppraisalScore?: number;
}
interface ProfessionalBodyActivity {
  name: string;
  activityType: string;
  score: number;
  ProfessionalBodyName?: string;
  ActivityType?: string;
  SelfAppraisalScore?: number;
}
interface DisciplinaryChargeRow {
  section: "Institutional" | "Society";
  details: string;
  remarks: string;
  Section?: "Institutional" | "Society";
  Details?: string;
  Remarks?: string;
}
interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee";
}
interface FetchedDraftData {
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
}
export default function ParentPage() {
  const router = useRouter();
  const [draftCategoryA, setDraftCategoryA] = useState<PublishedPaper[]>([]);
  const [draftCategoryB, setDraftCategoryB] = useState<BookChapter[]>([]);
  const [draftCategoryC, setDraftCategoryC] = useState<AuthoredBook[]>([]);
  const [draftCategoryD, setDraftCategoryD] = useState<ConferencePaper[]>([]);
  const [draftCategoryE, setDraftCategoryE] = useState<UGProject[]>([]);
  const [draftCategoryF, setDraftCategoryF] = useState<Patent[]>([]);
  const [draftCategoryG, setDraftCategoryG] = useState<DesignPatent[]>([]);
  const [draftCategoryH, setDraftCategoryH] = useState<Copyright[]>([]);
  const [draftCategoryI, setDraftCategoryI] = useState<FundedProject[]>([]);
  const [draftCategoryJ, setDraftCategoryJ] = useState<ResearchGuidance[]>([]);
  const [draftCategoryK, setDraftCategoryK] = useState<ConsultancyWork[]>([]);
  const [draftCategoryL, setDraftCategoryL] = useState<TrainingProgram[]>([]);
  const [draftCategoryM, setDraftCategoryM] = useState<Project3M[]>([]);
  const [draftCategoryN, setDraftCategoryN] = useState<ProfessionalBodyActivity[]>([]);
  const [draftCategoryO, setDraftCategoryO] = useState<DisciplinaryChargeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [committeeScoreA, setCommitteeScoreA] = useState<string>("");
  const [committeeScoreB, setCommitteeScoreB] = useState<string>("");
  const [committeeScoreC, setCommitteeScoreC] = useState<string>("");
  const [committeeScoreD, setCommitteeScoreD] = useState<string>("");
  const [committeeScoreE, setCommitteeScoreE] = useState<string>("");
  const [committeeScoreF, setCommitteeScoreF] = useState<string>("");
  const [committeeScoreG, setCommitteeScoreG] = useState<string>("");
  const [committeeScoreH, setCommitteeScoreH] = useState<string>("");
  const [committeeScoreI, setCommitteeScoreI] = useState<string>("");  
  const [committeeScoreJ, setCommitteeScoreJ] = useState<string>("");
  const [committeeScoreK, setCommitteeScoreK] = useState<string>("");
  const [committeeScoreL, setCommitteeScoreL] = useState<string>("");
  const [committeeScoreM, setCommitteeScoreM] = useState<string>("");
  const [committeeScoreN, setCommitteeScoreN] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");
  const [hasFetched, setHasFetched] = useState(false);
  const category = "category-3";
  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    const employeeId = sessionStorage.getItem("employeeId");
    const academicYear = sessionStorage.getItem("academicYear");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData)); // Parse the stored data
    } 
    if(employeeId){
      setEmployeeId(employeeId);
    }
    if(academicYear){
      setAcademicYear(academicYear);
    }
    else if(!storedData || !employeeId || !academicYear){
      alert("Some error occured");
    }
  }, [router]);
  console.log("Employee ID:", employeeId);
  console.log("Academic Year:", academicYear);
  const saveDraft = async (showToast=true) => {
    if (!facultyInfo) return;
  
    if (facultyInfo.loginType !== "faculty") {
      toast.info("Only faculty members can save drafts.");
      return;
    }
  
    // if (!academicYear) {
    //   toast.error("Please select an academic year before saving.");
    //   return;
    // }

    const formData = {
      employeeId: facultyInfo.eid,
      category,
      academicYear,
      data:{
        papers: draftCategoryA,
        chapters: draftCategoryB,
        books: draftCategoryC,
        conferencePapers: draftCategoryD,
        projects: draftCategoryE,
        patents: draftCategoryF,
        designPatents: draftCategoryG,
        copyrights: draftCategoryH,
        fundProjects: draftCategoryI,
        guidanceList: draftCategoryJ,
        consultancyWorks: draftCategoryK,
        programs: draftCategoryL,
        developedprojects: draftCategoryM,
        activities: draftCategoryN,
        data: draftCategoryO,
      }
    };

    try {
      const res = await fetch("/api/drafts/category-3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if(showToast) {
        toast.success("Draft saved successfully!");
        }
      } else {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("An error occurred while saving the draft.");
    }
  };

  const resetAllData = () => {
    setDraftCategoryA([]);
    setDraftCategoryB([]);
    setDraftCategoryC([]);
    setDraftCategoryD([]);
    setDraftCategoryE([]);
    setDraftCategoryF([]);
    setDraftCategoryG([]);
    setDraftCategoryH([]);
    setDraftCategoryI([]);
    setDraftCategoryJ([]);
    setDraftCategoryK([]);
    setDraftCategoryL([]);
    setDraftCategoryM([]);
    setDraftCategoryN([]);
    setDraftCategoryO([]);
  };

  const fetchFacultyData = async (employeeId: string, academicYear: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchData/category-3?employeeId=${employeeId}&academicYear=${academicYear}`);
      if (res.ok) {
        const json = await res.json();
        processFetchedData(
          json,
          setDraftCategoryA,
          setDraftCategoryB,
          setDraftCategoryC,
          setDraftCategoryD,
          setDraftCategoryE,
          setDraftCategoryF,
          setDraftCategoryG,
          setDraftCategoryH,
          setDraftCategoryI,
          setDraftCategoryJ,
          setDraftCategoryK,
          setDraftCategoryL,
          setDraftCategoryM,
          setDraftCategoryN,
          setDraftCategoryO,
        );
        console.log("json for employeeId " + employeeId + " academicYear " + academicYear + ":", json);
      } else {
        toast.error("Failed to fetch faculty data");
        resetAllData();
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      toast.error("An error occurred while fetching faculty data");
      resetAllData();
    } finally {
      setLoading(false);
    }
  };
  
  if (!hasFetched && (facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee") && employeeId && academicYear) {
    setHasFetched(true);
    fetchFacultyData(employeeId, academicYear);
  }
  
  
  useEffect(() => {
    const fetchDraft = async () => {
      if (!facultyInfo) return;
  
      if (facultyInfo.loginType === "faculty" && academicYear) {
        setLoading(true);
        try {
          console.log(`Fetching draft for employee ${facultyInfo.eid}, category ${category}, year ${academicYear}`);
          
          const res = await fetch(`/api/drafts/category-3?employeeId=${facultyInfo.eid}&category=${category}&academicYear=${academicYear}`);
          
          if (!res.ok) {
            console.error(`Failed to fetch draft: ${res.status} ${res.statusText}`);
            toast.error("Failed to fetch saved draft data");
            setLoading(false);
            return;
          }
          
          const json = await res.json();
          console.log("Fetched draft data:", json);
          
          // Process the fetched data directly without looking for a nested 'data' property
          processFetchedData(json, 
            setDraftCategoryA, 
            setDraftCategoryB,
            setDraftCategoryC,
            setDraftCategoryD,
            setDraftCategoryE,
            setDraftCategoryF,
            setDraftCategoryG,
            setDraftCategoryH,
            setDraftCategoryI,
            setDraftCategoryJ,
            setDraftCategoryK,
            setDraftCategoryL,
            setDraftCategoryM,
            setDraftCategoryN,
            setDraftCategoryO,
          );
        } catch (error) {
          console.error("Error fetching draft:", error);
          toast.error("An error occurred while fetching saved draft data");
          resetAllData();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchDraft();
  }, [facultyInfo, academicYear]);

  const processFetchedData = (
    json: FetchedDraftData,
    setDraftCategoryA: React.Dispatch<React.SetStateAction<PublishedPaper[]>>,
    setDraftCategoryB: React.Dispatch<React.SetStateAction<BookChapter[]>>,
    setDraftCategoryC: React.Dispatch<React.SetStateAction<AuthoredBook[]>>,
    setDraftCategoryD: React.Dispatch<React.SetStateAction<ConferencePaper[]>>,
    setDraftCategoryE: React.Dispatch<React.SetStateAction<UGProject[]>>,
    setDraftCategoryF: React.Dispatch<React.SetStateAction<Patent[]>>,
    setDraftCategoryG: React.Dispatch<React.SetStateAction<DesignPatent[]>>,
    setDraftCategoryH: React.Dispatch<React.SetStateAction<Copyright[]>>,
    setDraftCategoryI: React.Dispatch<React.SetStateAction<FundedProject[]>>,
    setDraftCategoryJ: React.Dispatch<React.SetStateAction<ResearchGuidance[]>>,
    setDraftCategoryK: React.Dispatch<React.SetStateAction<ConsultancyWork[]>>,
    setDraftCategoryL: React.Dispatch<React.SetStateAction<TrainingProgram[]>>,
    setDraftCategoryM: React.Dispatch<React.SetStateAction<Project3M[]>>,
    setDraftCategoryN: React.Dispatch<React.SetStateAction<ProfessionalBodyActivity[]>>,
    setDraftCategoryO: React.Dispatch<React.SetStateAction<DisciplinaryChargeRow[]>>,
  )=> {
      const PublishedPapers: PublishedPaper[] = [];
      const BookChapters: BookChapter[] = [];
      const AuthoredBooks: AuthoredBook[] = [];
      const ConferencePapers: ConferencePaper[] = [];
      const UGProjects: UGProject[] = [];
      const Patents: Patent[] = [];
      const DesignPatents: DesignPatent[] = [];
      const Copyrights: Copyright[] = [];
      const FundedProjects: FundedProject[] = [];
      const ResearchGuidance: ResearchGuidance[] = [];
      const ConsultancyWorks: ConsultancyWork[] = [];
      const TrainingPrograms: TrainingProgram[] = [];
      const DevelopedProjects: Project3M[] = [];
      const ProfessionalBodyActivities: ProfessionalBodyActivity[] = [];
      const DisciplinaryCharges: DisciplinaryChargeRow[] = [];

    const parseEntry = (entry: FetchedDraftData) => {
      // Process Category A (Teaching Activities)
      if (entry.papers && Array.isArray(entry.papers)) {
        entry.papers.forEach((item: PublishedPaper) => {
          const publishedPaper: PublishedPaper = {
            title: item.PaperTitle || item.title || "",
            journalName: item.JournalName || item.journalName || "",
            issnIsbn: item.ISSN_ISBN || item.issnIsbn || "",
            peerReviewed: item.PeerReviewedOrImpactFactor || item.peerReviewed || "",
            coAuthors: Number(item.NumberOfCoAuthors || item.coAuthors) || 0,
            mainAuthor: item.IsMainAuthor || item.mainAuthor || "",
            journalType: item.JournalType || item.journalType || " ",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          PublishedPapers.push(publishedPaper);
        });
      }
      // Process Category B (Book Chapters)
      if (entry.chapters && Array.isArray(entry.chapters)) {
        entry.chapters.forEach((item: BookChapter) => {
          const bookChapter: BookChapter = {
            title: item.BookChapterTitle || item.title || "",
            publisherDetails: item.PublisherDetails || item.publisherDetails || "",
            issnIsbn: item.ISSN_ISBN || item.issnIsbn || "",
            coAuthors: Number(item.NumberOfCoAuthors || item.coAuthors) || 0,
            isMainAuthor: item.IsMainAuthor || item.isMainAuthor || "",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          BookChapters.push(bookChapter);
        });
      }
      // Process Category C (Authored Books)
      if (entry.books && Array.isArray(entry.books)) {
        entry.books.forEach((item: AuthoredBook) => {
          const authoredBook: AuthoredBook = {
            title: item.BookTitle || item.title || "",
            publisherDetails: item.PublisherDetails || item.publisherDetails || "",
            issnIsbn: item.ISSN_ISBN || item.issnIsbn || "",
            coAuthors: Number(item.NumberOfCoAuthors || item.coAuthors) || 0,
            publicationType: item.PublicationLevel || item.publicationType || " ",
            role: item.AuthorRole || item.role || " ",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          AuthoredBooks.push(authoredBook);
        });
      }
      // Process Category D (Conference Papers)
      if (entry.conferencePapers && Array.isArray(entry.conferencePapers)) {
        entry.conferencePapers.forEach((item: ConferencePaper) => {
          const conferencePaper: ConferencePaper = {
            title: item.PaperTitle || item.title || "",
            conferenceDetails: item.ConferenceDetails || item.conferenceDetails || "",
            issnIsbn: item.ISSN_ISBN || item.issnIsbn || "",
            coAuthors: Number(item.NumberOfCoAuthors || item.coAuthors) || 0,
            authorRole: item.AuthorRole || item.authorRole || " ",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          ConferencePapers.push(conferencePaper);
        });
      }
      // Process Category E (UG Projects)
      if (entry.projects && Array.isArray(entry.projects)) {
        entry.projects.forEach((item: UGProject) => {
          const ugProject: UGProject = {
            projectTitle: item.ProjectTitle || item.projectTitle || "",
            ugPercentageCompletion: Number(item.UGCompletionPercent || item.ugPercentageCompletion) || 0,
            hasPaper: item.PaperPublished || item.hasPaper || "",
            hasPatent: item.PatentPublished || item.hasPatent || "",
            hasFunding: item.IsFunded || item.hasFunding || "",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          UGProjects.push(ugProject);
        });
      }
      // Process Category F (Patents)
      if (entry.patents && Array.isArray(entry.patents)) {
        entry.patents.forEach((item: Patent) => {
          const patent: Patent = {
            title: item.PatentTitle || item.title || "",
            date: item.FilingDate? item.FilingDate.split("T")[0] : item.date || "",
            type: item.PatentType || item.type || "Indian",
            status: item.Status || item.status || "Filed",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          Patents.push(patent);
        });
      }
      // Process Category G (Design Patents)
      if (entry.designPatents && Array.isArray(entry.designPatents)) {
        entry.designPatents.forEach((item: DesignPatent) => {
          const designPatent: DesignPatent = {
            title: item.DesignTitle || item.title || "",
            date: item.FilingDate? item.FilingDate.split("T")[0] : item.date || "",
            type: item.PatentType || item.type || "Indian",
            status: item.Status || item.status || "Filed",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          DesignPatents.push(designPatent);
        });
      }
      // Process Category H (Copyrights)
      if (entry.copyrights && Array.isArray(entry.copyrights)) {
        entry.copyrights.forEach((item: Copyright) => {
          const copyright: Copyright = {
            title: item.CopyrightTitle || item.title || "",
            date: item.RegistrationDate? item.RegistrationDate.split("T")[0] : item.date || "",
            type: item.CopyrightType || item.type || "Indian",
            score: String(item.SelfAppraisalScore || item.score) || "0",
          };
          Copyrights.push(copyright);
        });
      }
      // Process Category I (Funded Projects)
      if (entry.fundProjects && Array.isArray(entry.fundProjects)) {
        entry.fundProjects.forEach((item: FundedProject) => {
          const fundedProject: FundedProject = {
            title: item.ProjectTitle || item.title || "",
            agency: item.FundingAgency || item.agency || "",
            year: item.SanctionYear || item.year || "",
            period: item.ProjectPeriod || item.period || "",
            grant : String(item.AmountMobilized || item.grant) || "",
            status: item.ProjectStatus || item.status || "Completed",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          FundedProjects.push(fundedProject);
        });
      }
      // Process Category J (Research Guidance)
      if (entry.guidanceList && Array.isArray(entry.guidanceList)) {
        entry.guidanceList.forEach((item: ResearchGuidance) => {
          const researchGuidance: ResearchGuidance = {
            degree: item.Degree || item.degree || "Ph.D",
            candidateName: item.CandidateName || item.candidateName || "",
            thesisTitle: item.ThesisTitle || item.thesisTitle || "",
            university: item.University || item.university || "",
            status: item.Status || item.status || "",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          ResearchGuidance.push(researchGuidance);
        });
      }
      // Process Category K (Consultancy Works)
      if (entry.consultancyWorks && Array.isArray(entry.consultancyWorks)) {
        entry.consultancyWorks.forEach((item: ConsultancyWork) => {
          const consultancyWork: ConsultancyWork = {
            title: item.ConsultancyTitle || item.title || "",
            startDate: item.StartDate? item.StartDate.split("T")[0] : item.startDate || "",
            endDate: item.EndDate? item.EndDate.split("T")[0] : item.endDate || "",
            clientType: item.ClientType || item.clientType || "Government",
            natureOfWork: item.NatureOfWork || item.natureOfWork || "",
            amount: Number(item.Amount || item.amount) || 0,
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          ConsultancyWorks.push(consultancyWork);
        });
      }
      // Process Category L (Training Programs)
      if (entry.programs && Array.isArray(entry.programs)) {
        entry.programs.forEach((item: TrainingProgram) => {
          const trainingProgram: TrainingProgram = {
            title: item.ProgramTitle || item.title || "",
            duration: item.Duration || item.duration || "",
            organizedBy: item.OrganizedBy || item.organizedBy || "",
            type: item.ProgramType || item.type || "Certification",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          TrainingPrograms.push(trainingProgram);
        });
      }
      // Process Category M (Developed Projects)
      if (entry.developedprojects && Array.isArray(entry.developedprojects)) {
        entry.developedprojects.forEach((item: Project3M) => {
          const developedProject: Project3M = {
            title: item.ProjectTitle || item.title || "",
            status: item.ProjectStatus || item.status || "Ongoing",
            trl: Number(item.TRLLevel || item.trl) || null,
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          DevelopedProjects.push(developedProject);
        });
      }
      // Process Category N (Professional Body Activities)
      if (entry.activities && Array.isArray(entry.activities)) {
        entry.activities.forEach((item: ProfessionalBodyActivity) => {
          const professionalBodyActivity: ProfessionalBodyActivity = {
            name: item.ProfessionalBodyName || item.name || "",
            activityType: item.ActivityType || item.activityType || "",
            score: Number(item.SelfAppraisalScore || item.score) || 0,
          };
          ProfessionalBodyActivities.push(professionalBodyActivity);
        }); 
      }
      // Process Category O (Disciplinary Charges)
      if (entry.data && Array.isArray(entry.data)) {
        entry.data.forEach((item: DisciplinaryChargeRow) => {
          const disciplinaryCharge: DisciplinaryChargeRow = {
            section: item.Section || item.section || "Institutional",
            details: item.Details || item.details || "",
            remarks: item.Remarks || item.remarks || "",
          };
          DisciplinaryCharges.push(disciplinaryCharge);
        });
      }
    };
  
    // Ensure json is an array or object, and proceed with parsing
    if (Array.isArray(json)) {
      json.forEach(parseEntry);
    } else if (json) {
      parseEntry(json);
    } else {
      console.error("Invalid JSON structure:", json);
    }
  
    // Update state after processing the data
    setDraftCategoryA(PublishedPapers);
    setDraftCategoryB(BookChapters);
    setDraftCategoryC(AuthoredBooks);
    setDraftCategoryD(ConferencePapers);
    setDraftCategoryE(UGProjects);
    setDraftCategoryF(Patents);
    setDraftCategoryG(DesignPatents);
    setDraftCategoryH(Copyrights);
    setDraftCategoryI(FundedProjects);
    setDraftCategoryJ(ResearchGuidance);
    setDraftCategoryK(ConsultancyWorks);
    setDraftCategoryL(TrainingPrograms);
    setDraftCategoryM(DevelopedProjects);
    setDraftCategoryN(ProfessionalBodyActivities);
    setDraftCategoryO(DisciplinaryCharges);
  };

  const handleFormDataUpdateA = (updatedData: PublishedPaper[]) => {
    setDraftCategoryA(updatedData);
  };
  const handleFormDataUpdateB = (updatedData: BookChapter[]) => {
    setDraftCategoryB(updatedData);
  };
  const handleFormDataUpdateC = (updatedData: AuthoredBook[]) => {
    setDraftCategoryC(updatedData);
  };
  const handleFormDataUpdateD = (updatedData: ConferencePaper[]) => {
    setDraftCategoryD(updatedData);
  };
  const handleFormDataUpdateE = (updatedData: UGProject[]) => {
    setDraftCategoryE(updatedData);
  };
  const handleFormDataUpdateF = (updatedData: Patent[]) => {
    setDraftCategoryF(updatedData);
  };
  const handleFormDataUpdateG = (updatedData: DesignPatent[]) => {
    setDraftCategoryG(updatedData);
  };
  const handleFormDataUpdateH = (updatedData: Copyright[]) => {
    setDraftCategoryH(updatedData);
  };
  const handleFormDataUpdateI = (updatedData: FundedProject[]) => {
    setDraftCategoryI(updatedData);
  };
  const handleFormDataUpdateJ = (updatedData: ResearchGuidance[]) => {
    setDraftCategoryJ(updatedData);
  };
  const handleFormDataUpdateK = (updatedData: ConsultancyWork[]) => {
    setDraftCategoryK(updatedData);
  };
  const handleFormDataUpdateL = (updatedData: TrainingProgram[]) => {
    setDraftCategoryL(updatedData);
  };
  const handleFormDataUpdateM = (updatedData: Project3M[]) => {
    setDraftCategoryM(updatedData);
  };
  const handleFormDataUpdateN = (updatedData: ProfessionalBodyActivity[]) => {
    setDraftCategoryN(updatedData);
  };
  const handleFormDataUpdateO = (updatedData: DisciplinaryChargeRow[]) => {
    setDraftCategoryO(updatedData);
  };

  const calculateTotalScore = (items: { score: number | string }[]) =>
    items.reduce((total, item) => total + (Number(item.score) || 0), 0);

  const totalScore =
    calculateTotalScore(draftCategoryA)+
    calculateTotalScore(draftCategoryB) +
    calculateTotalScore(draftCategoryC) +
    calculateTotalScore(draftCategoryD) +
    calculateTotalScore(draftCategoryE) +
    calculateTotalScore(draftCategoryF) +
    calculateTotalScore(draftCategoryG) +
    calculateTotalScore(draftCategoryH) +
    calculateTotalScore(draftCategoryI) +
    calculateTotalScore(draftCategoryJ)+
    calculateTotalScore(draftCategoryK) +
    calculateTotalScore(draftCategoryL) +
    calculateTotalScore(draftCategoryM) +
    calculateTotalScore(draftCategoryN);

    useEffect(() => {
      if (!loading) {
        const finalCategory3Data = {
          score:totalScore,
          academicYear,
          papers: draftCategoryA,
        chapters: draftCategoryB,
        books: draftCategoryC,
        conferencePapers: draftCategoryD,
        projects: draftCategoryE,
        patents: draftCategoryF,
        designPatents: draftCategoryG,
        copyrights: draftCategoryH,
        fundProjects: draftCategoryI,
        guidanceList: draftCategoryJ,
        consultancyWorks: draftCategoryK,
        programs: draftCategoryL,
        developedprojects: draftCategoryM,
        activities: draftCategoryN,
        data: draftCategoryO,
        };
        sessionStorage.setItem("category3", JSON.stringify(finalCategory3Data));
        console.log("category3 Summary saved to sessionStorage:", finalCategory3Data);
      }
    }, [loading, totalScore, draftCategoryA,
      draftCategoryB,
      draftCategoryC,
      draftCategoryD,
      draftCategoryE,
      draftCategoryF,
      draftCategoryG,
      draftCategoryH,
      draftCategoryI,
      draftCategoryJ,
      draftCategoryK,
      draftCategoryL,
      draftCategoryM,
      draftCategoryN,
      draftCategoryO,
      academicYear,
     ]);
     const totalCommitteeScore = Number(committeeScoreA) + Number(committeeScoreB) + Number(committeeScoreC) + 
     Number(committeeScoreD) + Number(committeeScoreE) + Number(committeeScoreF) + Number(committeeScoreG) + 
     Number(committeeScoreH) + Number(committeeScoreI) + Number(committeeScoreJ) + Number(committeeScoreK) + 
     Number(committeeScoreL) + Number(committeeScoreM) + Number(committeeScoreN);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row items-start space-x-2">
      <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/facultyhome">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
          {facultyInfo && facultyInfo.loginType === "faculty" && (
            <>
          <Link href="/faculty_part_a">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-A
            </button>
          </Link>
          <Link href="/partb/category-1">
        <button
          className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
        >
          Part-B
        </button>
        </Link>
        </>
        )}
        {facultyInfo && facultyInfo.loginType !== "faculty" && (
          <>
          <Link href="/partc">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-C
            </button>
          </Link>
        </>
        )}
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

        {loading ? (
          <p className="text-gray-600">Loading draft data...</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl mb-8">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
              PART B: ACADEMIC PERFORMANCE INDICATOR (API)
              <br />
              CATEGORY III:
            </h1>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Research, Publications & Academic Contribution  
            Related Activities 
            </h2>
            {facultyInfo && (
              <>
                {/* For HOD or Committee: Check both faculty and academic year */}
                {(facultyInfo.loginType === "hod" || facultyInfo.loginType === "committee") && (
                  <>
                    {!academicYear ? (
                      router.push("/partb/category-1")
                    ) : (
                      <>
                      <Category3A
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryA}
                        onFormDataChangeAction={handleFormDataUpdateA}
                        onCommitteeScoreChange={(score) => setCommitteeScoreA(score)}
                      />
                      <Category3B
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryB}
                        onFormDataChangeAction={handleFormDataUpdateB}
                        onCommitteeScoreChange={(score) => setCommitteeScoreB(score)}
                      />
                      <Category3C
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryC}
                        onFormDataChangeAction={handleFormDataUpdateC}
                        onCommitteeScoreChange={(score) => setCommitteeScoreC(score)}
                      />
                      <Category3D
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryD}
                        onFormDataChangeAction={handleFormDataUpdateD}
                        onCommitteeScoreChange={(score) => setCommitteeScoreD(score)}
                      />
                      <Category3E
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryE}
                        onFormDataChangeAction={handleFormDataUpdateE}
                        onCommitteeScoreChange={(score) => setCommitteeScoreE(score)}
                      />
                      <Category3F
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryF}
                        onFormDataChangeAction={handleFormDataUpdateF}
                        onCommitteeScoreChange={(score) => setCommitteeScoreF(score)}
                      />
                      <Category3G
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryG}
                        onFormDataChangeAction={handleFormDataUpdateG}
                        onCommitteeScoreChange={(score) => setCommitteeScoreG(score)}
                      />
                      <Category3H
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryH}
                        onFormDataChangeAction={handleFormDataUpdateH}
                        onCommitteeScoreChange={(score) => setCommitteeScoreH(score)}
                      />
                      <Category3I
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryI}
                        onFormDataChangeAction={handleFormDataUpdateI}
                        onCommitteeScoreChange={(score) => setCommitteeScoreI(score)}
                      />
                      <Category3J
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryJ}
                        onFormDataChangeAction={handleFormDataUpdateJ}
                        onCommitteeScoreChange={(score) => setCommitteeScoreJ(score)}
                      />
                      <Category3K
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryK}
                        onFormDataChangeAction={handleFormDataUpdateK}
                        onCommitteeScoreChange={(score) => setCommitteeScoreK(score)}
                      />
                      <Category3L
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryL}
                        onFormDataChangeAction={handleFormDataUpdateL}
                        onCommitteeScoreChange={(score) => setCommitteeScoreL(score)}
                      />
                      <Category3M
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryM}
                        onFormDataChangeAction={handleFormDataUpdateM}
                        onCommitteeScoreChange={(score) => setCommitteeScoreM(score)}
                      />
                      <Category3N
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryN}
                        onFormDataChangeAction={handleFormDataUpdateN}
                        onCommitteeScoreChange={(score) => setCommitteeScoreN(score)}
                      />
                      <Category3O
                        loginType={facultyInfo.loginType}
                        initialData={draftCategoryO}
                        onFormDataChangeAction={handleFormDataUpdateO}
                       />
                       <TeacherDocumentUpload/>
                      </>
                    )}
                  </>
                )}
            {/* <div className="mt-8" /> */}
            {facultyInfo.loginType === "faculty" && (
          <>
            <Category3A
              loginType={facultyInfo.loginType}
              initialData={draftCategoryA}
              onFormDataChangeAction={handleFormDataUpdateA}
              // selectedAcademicYear={academicYear}
            />
            <Category3B
              loginType={facultyInfo.loginType}
              initialData={draftCategoryB}
              onFormDataChangeAction={handleFormDataUpdateB}
            />
            <Category3C
              loginType={facultyInfo.loginType}
              initialData={draftCategoryC}
              onFormDataChangeAction={handleFormDataUpdateC}
            />
            <Category3D
              loginType={facultyInfo.loginType}
              initialData={draftCategoryD}
              onFormDataChangeAction={handleFormDataUpdateD}
            />
            <Category3E
              loginType={facultyInfo.loginType}
              initialData={draftCategoryE}
              onFormDataChangeAction={handleFormDataUpdateE}
            />
            <Category3F
              loginType={facultyInfo.loginType}
              initialData={draftCategoryF}
              onFormDataChangeAction={handleFormDataUpdateF}
            />
            <Category3G
              loginType={facultyInfo.loginType}
              initialData={draftCategoryG}
              onFormDataChangeAction={handleFormDataUpdateG}
            />
            <Category3H
              loginType={facultyInfo.loginType}
              initialData={draftCategoryH}
              onFormDataChangeAction={handleFormDataUpdateH}
              />
            <Category3I
              loginType={facultyInfo.loginType}
              initialData={draftCategoryI}
              onFormDataChangeAction={handleFormDataUpdateI}
            />
            <Category3J
              loginType={facultyInfo.loginType}
              initialData={draftCategoryJ || { score: "" }}
              onFormDataChangeAction={handleFormDataUpdateJ}
            />
            <Category3K
              loginType={facultyInfo.loginType}
              initialData={draftCategoryK}
              onFormDataChangeAction={handleFormDataUpdateK}
            />
            <Category3L
              loginType={facultyInfo.loginType}
              initialData={draftCategoryL}
              onFormDataChangeAction={handleFormDataUpdateL}
            />
            <Category3M
              loginType={facultyInfo.loginType}
              initialData={draftCategoryM}
              onFormDataChangeAction={handleFormDataUpdateM}
            />
            <Category3N
              loginType={facultyInfo.loginType}
              initialData={draftCategoryN}
              onFormDataChangeAction={handleFormDataUpdateN}
            />
            <Category3O
              loginType={facultyInfo.loginType}
              initialData={draftCategoryO}
              onFormDataChangeAction={handleFormDataUpdateO}
            />
            <TeacherDocumentUpload/>
            </>
          )}
        </>
    )}
            <hr className="my-4" />
            <p className="mb-6">
              <strong>Combined Total Score: </strong>
              <span className="text-green-600 text-xl font-semibold">
                {totalScore} / 600
              </span>
            </p>
            {facultyInfo?.loginType === "committee" && (
                  <p className="mb-6">
                  <strong>Committee Total Score: </strong>
                  <span className="text-yellow-600 text-xl font-semibold">
                    {totalCommitteeScore} / 600
                  </span>
                  </p>
                )}
            <div className="flex justify-between items-center mt-8">
  {/* Save Draft button on the left */}
  <button
                  type="button"
                  className={`text-white px-6 py-2 rounded ${
                    facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee"
                      ?  "bg-gray-500 cursor-not-allowed hover:bg-gray-600"
                      :"bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  onClick={() => saveDraft(true)}
                  disabled={facultyInfo?.loginType === "hod" || facultyInfo?.loginType === "committee"}

                >
    Save Draft
  </button>

  {/* Back and Next buttons on the right */}
  <div className="flex space-x-4">
    <Link href="/partb/category-1"> {/* Replace with your correct previous page URL */}
      <button
        type="button"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
      >
        Back
      </button>
    </Link>
    <button
  type="button"
  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
  onClick={async () => {
    try{
    await saveDraft(false); // silent save
    if (typeof totalCommitteeScore === "number") {
      sessionStorage.setItem("committeeScore3", String(totalCommitteeScore));
    }
    console.log("Committee 3:", totalCommitteeScore);
    router.push('/finalsubmit');
  } catch (error) {
    console.error("Error during draft save or navigation:", error);
  }
  }}
>Next</button>
  </div>
</div>

          </div>
        )}
      </div>
    </div>
  );
}
