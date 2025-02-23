import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { AttendanceRecord } from '../types';

export const generatePDF = (attendanceRecord: AttendanceRecord) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Attendance Report', 14, 22);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Date: ${format(new Date(attendanceRecord.date), 'MMMM dd, yyyy')}`, 14, 32);
  
  // Create table data
  const tableData = attendanceRecord.students.map(student => [
    student.usn,
    student.name,
    student.present ? 'Present' : 'Absent'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['USN', 'Student Name', 'Status']],
    body: tableData,
    startY: 40,
    styles: { fontSize: 12, cellPadding: 5 },
    headStyles: { fillColor: [66, 139, 202] }
  });
  
  // Add summary
  const totalPresent = attendanceRecord.students.filter(s => s.present).length;
  const totalStudents = attendanceRecord.students.length;
  const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(1);
  
  const finalY = (doc as any).lastAutoTable.finalY || 40;
  doc.text(`Total Present: ${totalPresent}/${totalStudents}`, 14, finalY + 20);
  doc.text(`Attendance Rate: ${attendanceRate}%`, 14, finalY + 30);
  
  // Add list of absentees
  const absentees = attendanceRecord.students.filter(s => !s.present);
  if (absentees.length > 0) {
    doc.text('List of Absentees:', 14, finalY + 45);
    absentees.forEach((student, index) => {
      doc.text(`${index + 1}. ${student.usn} - ${student.name}`, 20, finalY + 55 + (index * 10));
    });
  }
  
  // Save the PDF
  doc.save(`attendance-report-${attendanceRecord.date}.pdf`);
};