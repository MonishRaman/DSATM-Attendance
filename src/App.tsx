import React, { useState } from 'react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileDown, Share2 } from 'lucide-react';

interface Student {
  id: string;
  usn: string;
  name: string;
  status: 'present' | 'absent';
}

const initialStudents: Student[] = [
  { id: '1', usn: '1DT23CA001', name: 'ADITHI KUMBLE', status: 'present' },
  { id: '2', usn: '1DT23CA002', name: 'ALLENKI SAI HARINI', status: 'present' },
  { id: '3', usn: '1DT23CA003', name: 'ANKITA KUMARI', status: 'present' },
  { id: '4', usn: '1DT23CA004', name: 'ARYAN SINGH', status: 'present' },
  { id: '5', usn: '1DT23CA005', name: 'BATTA MANOJ CHOWDARY', status: 'present' },
  { id: '6', usn: '1DT23CA006', name: 'C P KEVIN THIMMAIAH', status: 'present' },
  { id: '7', usn: '1DT23CA007', name: 'CHIRANTH R GOWDA', status: 'present' },
  { id: '8', usn: '1DT23CA008', name: 'DESHPANDE ADITYA', status: 'present' },
  { id: '9', usn: '1DT23CA009', name: 'DHANYA J NADIG', status: 'present' },
  { id: '10', usn: '1DT23CA010', name: 'ERLA SAI DINESH YADAV', status: 'present' },
  { id: '11', usn: '1DT23CA011', name: 'GARV RASTOGI', status: 'present' },
  { id: '12', usn: '1DT23CA012', name: 'GUNTHA VENKATA SAI CHATURVA', status: 'present' },
  { id: '13', usn: '1DT23CA013', name: 'HEMANTH KUMAR B', status: 'present' },
  { id: '14', usn: '1DT23CA014', name: 'HEMANTH L', status: 'present' },
  { id: '15', usn: '1DT23CA015', name: 'KALUGURI TEJA', status: 'present' },
  { id: '16', usn: '1DT23CA016', name: 'KEERTHANA DINESH', status: 'present' },
  { id: '17', usn: '1DT23CA017', name: 'KRITHIKA N', status: 'present' },
  { id: '18', usn: '1DT23CA018', name: 'LAKSHY MISHRA', status: 'present' },
  { id: '19', usn: '1DT23CA019', name: 'MALVIYA MAYANK VIJAY', status: 'present' },
  { id: '20', usn: '1DT23CA020', name: 'MANAN DOKWAL', status: 'present' },
  { id: '21', usn: '1DT23CA021', name: 'MANISH N JOG', status: 'present' },
  { id: '22', usn: '1DT23CA022', name: 'MARWAN YAKOOB MATTUVAYIL', status: 'present' },
  { id: '23', usn: '1DT23CA023', name: 'MATHAMSETTY SATYA PRAVINYA', status: 'present' },
  { id: '24', usn: '1DT23CA024', name: 'MEDISETTY SATYA KSHITIJ', status: 'present' },
  { id: '25', usn: '1DT23CA025', name: 'MOHAMED JUNAID', status: 'present' },
  { id: '26', usn: '1DT23CA026', name: 'NEESHITH SAHAL', status: 'present' },
  { id: '27', usn: '1DT23CA027', name: 'NITHYA M G', status: 'present' },
  { id: '28', usn: '1DT23CA028', name: 'NITHYASHREE', status: 'present' },
  { id: '29', usn: '1DT23CA029', name: 'NITINGOUDA SURESHGOUDA PATIL', status: 'present' },
  { id: '30', usn: '1DT23CA030', name: 'PENCHALAPADU CHIRASMARAN SAI', status: 'present' },
  { id: '31', usn: '1DT23CA031', name: 'POOJA REDDY', status: 'present' },
  { id: '32', usn: '1DT23CA032', name: 'POORVIKHA M', status: 'present' },
  { id: '33', usn: '1DT23CA033', name: 'PRAJWAL R', status: 'present' },
  { id: '34', usn: '1DT23CA034', name: 'PRATHAM K A', status: 'present' },
  { id: '35', usn: '1DT23CA035', name: 'PRITHVIRAJ PATIL', status: 'present' },
  { id: '36', usn: '1DT23CA036', name: 'PUNEET PRAJAPAT', status: 'present' },
  { id: '37', usn: '1DT23CA037', name: 'PUNYA P', status: 'present' },
  { id: '38', usn: '1DT23CA038', name: 'R MONISH', status: 'present' },
  { id: '39', usn: '1DT23CA039', name: 'RAKSHITH H D', status: 'present' },
  { id: '40', usn: '1DT23CA040', name: 'RANJAN S', status: 'present' },
  { id: '41', usn: '1DT23CA041', name: 'RAYADURGAM CHAITANYA RAMKUMAR', status: 'present' },
  { id: '42', usn: '1DT23CA042', name: 'RITURAJ SINGH', status: 'present' },
  { id: '43', usn: '1DT23CA043', name: 'RUCHITHA K', status: 'present' },
  { id: '44', usn: '1DT23CA044', name: 'RUPARAM K', status: 'present' },
  { id: '45', usn: '1DT23CA045', name: 'RUPESH P', status: 'present' },
  { id: '46', usn: '1DT23CA046', name: 'SANDEEP K', status: 'present' },
  { id: '47', usn: '1DT23CA047', name: 'SARTHAK UPADHYAY', status: 'present' },
  { id: '48', usn: '1DT23CA048', name: 'SEBASTIAN MATHEW', status: 'present' },
  { id: '49', usn: '1DT23CA049', name: 'SHASHANK B', status: 'present' },
  { id: '50', usn: '1DT23CA050', name: 'SHASWAT MISHRA', status: 'present' },
  { id: '51', usn: '1DT23CA051', name: 'SHREYAS R', status: 'present' },
  { id: '52', usn: '1DT23CA052', name: 'SIRIPI RAGHU RAM', status: 'present' },
  { id: '53', usn: '1DT23CA053', name: 'SUDARSHAN SAI YASHAS BOGGARAPU', status: 'present' },
  { id: '54', usn: '1DT23CA054', name: 'SUDEEP GOWDA K N', status: 'present' },
  { id: '55', usn: '1DT23CA055', name: 'SUJAY B J', status: 'present' },
  { id: '56', usn: '1DT23CA056', name: 'SUPRIYA S', status: 'present' },
  { id: '57', usn: '1DT23CA057', name: 'TERRENCE INFANT J', status: 'present' },
  { id: '58', usn: '1DT23CA058', name: 'THANMAYI URS', status: 'present' },
  { id: '59', usn: '1DT23CA059', name: 'THANUSH M', status: 'present' },
  { id: '60', usn: '1DT23CA060', name: 'THOMAS A FERNANDES', status: 'present' },
  { id: '61', usn: '1DT23CA061', name: 'VISHVAS', status: 'present' },
  { id: '62', usn: '1DT23CA062', name: 'YAGNESH REDDY BOLLA', status: 'present' },
  { id: '63', usn: '1DT23CA063', name: 'ZOYA FATHIMA', status: 'present' },
  { id: '64', usn: '1DT23CA400', name: 'Aditya Gajanan Mundase', status: 'present' },
  { id: '65', usn: '1DT23CA401', name: 'Chandu R', status: 'present' },
  { id: '66', usn: '1DT23CA402', name: 'G Surya Karthik', status: 'present' },
  { id: '67', usn: '1DT23CA403', name: 'Thara H C', status: 'present' },
  { id: '68', usn: '1DT23CA404', name: 'Vikram Shivappa Gali', status: 'present' }
];

const subjects = [
  { name: 'Statistics and Probability', faculty: 'Dr. Fathimunnisa' },
  { name: 'Analysis & Design of Algorithm', faculty: 'Prof. Priyanka R' },
  { name: 'Microcontroller and Robotics', faculty: 'Prof. Sahana Sharma M' },
  { name: 'Cloud Computing', faculty: 'Prof. Priyanka V Gudada' },
  { name: 'Business Intelligence', faculty: 'Prof. Bhaskar Rao' },
  { name: 'Scala', faculty: 'Prof. Priyanka V Gudada' },
  { name: 'BioInformatics', faculty: 'Raghu Sir' },
  { name: 'Universal Human Values', faculty: 'Prof. Priyanka V Gudada' },
  { name: 'NSS/PE', faculty: 'Prof. Priyanka R' },
];

const timeSlots = [
  '9:30 AM TO 10:25 AM',
  '10:25 AM TO 11:20 AM',
  '11:35 AM TO 12:30 PM',
  '12:30 PM TO 1:25 PM',
  '2:15 PM TO 3:10 PM',
  '2:15 PM TO 4:05 PM',
  '3:10 PM TO 4:05 PM',
  '4:05 TO 5:00 PM',
];

const sessionTypes = ['Regular Class', 'Tutorial', 'Lab Session', 'Substitution'];

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [absentNumbers, setAbsentNumbers] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('Regular Class');
  const [note, setNote] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleAbsentMarking = () => {
    const numbers = absentNumbers.split(/[,\s]+/).map(n => n.trim());
    setStudents(prevStudents => 
      prevStudents.map(student => ({
        ...student,
        status: numbers.some(n => student.usn.endsWith(n)) ? 'absent' : 'present'
      }))
    );
    setAbsentNumbers('');
  };

  const handleToggleStatus = (usn: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.usn === usn
          ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
          : student
      )
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const today = new Date();
    const dateStr = format(today, 'dd/MM/yyyy');
    const dayStr = format(today, 'EEEE');

    // Title
    doc.setFontSize(16);
    doc.text('Department of CSE (AI) – 4th Semester Attendance Report', 105, 15, { align: 'center' });
    
    // Header info
    doc.setFontSize(12);
    doc.text(`Date: ${dateStr} (${dayStr})`, 15, 25);
    doc.text(`Subject: ${selectedSubject}`, 15, 32);
    doc.text(`Time: ${selectedTime}`, 15, 39);
    doc.text(`Faculty: ${selectedFaculty}`, 15, 46);
    doc.text(`Session Type: ${selectedSessionType}`, 15, 53);
    if (note) {
      doc.text(`Note: ${note}`, 15, 60);
    }

    const startY = note ? 67 : 60;

    // Main attendance table
    const tableData = students.map(s => [s.usn, s.name, s.status.toUpperCase()]);
    (doc as any).autoTable({
      head: [['USN', 'Name', 'Status']],
      body: tableData,
      startY: startY,
      theme: 'grid',
    });

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Attendance Summary
    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'absent').length;
    
    doc.text('Attendance Summary:', 15, finalY);
    doc.text(`Total Students: ${students.length}`, 15, finalY + 7);
    doc.text(`Present: ${presentCount}`, 15, finalY + 14);
    doc.text(`Absent: ${absentCount}`, 15, finalY + 21);

    // Absentees list on the same page if there's space, otherwise on new page
    const absentees = students.filter(s => s.status === 'absent');
    if (absentees.length > 0) {
      const absenteesStartY = finalY + 30;
      
      if (absenteesStartY > doc.internal.pageSize.height - 40) {
        doc.addPage();
        doc.text('List of Absentees:', 15, 15);
        (doc as any).autoTable({
          head: [['USN', 'Name']],
          body: absentees.map(s => [s.usn, s.name]),
          startY: 25,
          theme: 'grid',
        });
      } else {
        doc.text('List of Absentees:', 15, absenteesStartY);
        (doc as any).autoTable({
          head: [['USN', 'Name']],
          body: absentees.map(s => [s.usn, s.name]),
          startY: absenteesStartY + 10,
          theme: 'grid',
        });
      }
    }

    // Create blob URL for sharing
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    
    // Download the PDF
    doc.save('attendance-report.pdf');
  };

  const handleShare = async () => {
    if (!pdfUrl) return;

    if (navigator.share) {
      try {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const file = new File([blob], 'attendance-report.pdf', { type: 'application/pdf' });
        
        await navigator.share({
          files: [file],
          title: 'Attendance Report',
          text: 'Sharing attendance report'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support native sharing
      const mailtoLink = `mailto:?subject=Attendance Report&body=Please find the attendance report attached.`;
      window.open(mailtoLink);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subject = subjects.find(s => s.name === e.target.value);
    setSelectedSubject(e.target.value);
    if (subject) {
      setSelectedFaculty(subject.faculty);
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Generate Report and Share Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FileDown size={20} />
              Generate Report
            </button>
            {pdfUrl && (
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Share2 size={20} />
                Share Report
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-6">Attendance Management System</h1>
          
          {/* Header Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.name} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Session Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedSessionType}
                onChange={(e) => setSelectedSessionType(e.target.value)}
              >
                {sessionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Faculty</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedFaculty}
                readOnly
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Note</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          {/* Quick Mark Absences */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Quick Mark Absences</h2>
            <p className="text-sm text-gray-600 mb-2">Enter USN numbers (e.g., 001,002) - separated by commas or spaces</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter numbers (e.g., 038,025)"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={absentNumbers}
                onChange={(e) => setAbsentNumbers(e.target.value)}
              />
              <button
                onClick={handleAbsentMarking}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Mark Absent
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.usn}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.usn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(student.usn)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          student.status === 'present'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {student.status === 'present' ? 'Mark Absent' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Attendance Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded shadow">
                <p className="text-gray-600 font-semibold">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="text-gray-600 font-semibold">Present</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="text-gray-600 font-semibold">Absent</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;