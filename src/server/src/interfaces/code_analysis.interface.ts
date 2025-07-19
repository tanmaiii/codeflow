export interface CodeAnalysis {
  id: string;
  reposId: string;
  branch: string;
  commitSha: string; // commit sha của branch
  qualityGate: string; // chất lượng mã
  bugs: number; // số lượng lỗi
  vulnerabilities: number; // số lượng rủi ro
  codeSmells: number; // số lượng cảm giác mã
  coverage: number; // phần trăm code được test
  duplicatedLinesDensity: number; // phần trăm dòng code trùng lặp
  securityRating: number;
  linesOfCode: number;
  url: string;
}
