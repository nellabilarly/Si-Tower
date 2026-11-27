import { readFileSync } from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";
import TowerDashboard, { type TowerRecord } from "../TowerDashboard";

function getText(value: unknown): string {
  return typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";
}

function getTowerRecords(): TowerRecord[] {
  const filePath = path.join(
    process.cwd(),
    "public",
    "Database_Mitratel_TCM.xlsx",
  );
  const file = readFileSync(filePath);
  const workbook = XLSX.read(file);
  const sheetName = workbook.SheetNames[0];
  const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;

  if (!sheet) {
    throw new Error("Sheet data tower tidak ditemukan di file Excel.");
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });

  return rows
    .map((row) => ({
      id: getText(row.name),
      status: getText(row.status),
      site: getText(row.site_name_dmt) || getText(row.tower_name),
      customer: getText(row.customer),
      priority: getText(row.priority),
      issueType: getText(row.issue_type),
      city: getText(row.disctrict_city),
      region: getText(row.region),
      createdAt: getText(row.creation),
    }))
    .filter((record) => record.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const records = getTowerRecords();

export default function DashboardPage() {
  return <TowerDashboard records={records} />;
}
