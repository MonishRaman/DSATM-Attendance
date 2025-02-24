import React, { useState } from 'react';
import { FileDown, Users } from 'lucide-react';
import AttendanceTable from './components/AttendanceTable';
import { generatePDF } from './utils/pdfGenerator';
import { Student, AttendanceRecord } from './types';

function App() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', usn: '1DT23CA001', name: 'ADITHI KUMBLE', present: true },
    { id: '2', usn: '1DT23CA002', name: 'ALLENKI SAI HARINI', present: true },
    { id: '3', usn: '1DT23CA003', name: 'ANKITA KUMARI', present: true },
    { id: '4', usn: '1DT23CA004', name: 'ARYAN SINGH', present: true },
    { id: '5', usn: '1DT23CA005', name: 'BATTA MANOJ CHOWDARY', present: true },
    { id: '6', usn: '1DT23CA006', name: 'C P KEVIN THIMMAIAH', present: true },
    { id: '7', usn: '1DT23CA007', name: 'CHIRANTH R GOWDA', present: true },
    { id: '8', usn: '1DT23CA008', name: 'DESHPANDE ADITYA', present: true },
    { id: '9', usn: '1DT23CA009', name: 'DHANYA J NADIG', present: true },
    { id: '10', usn: '1DT23CA010', name: 'ERLA SAI DINESH YADAV', present: true },
    { id: '11', usn: '1DT23CA011', name: 'GARV RASTOGI', present: true },
    { id: '12', usn: '1DT23CA012', name: 'GUNTHA VENKATA SAI CHATURVA', present: true },
    { id: '13', usn: '1DT23CA013', name: 'HEMANTH KUMAR B', present: true },
    { id: '14', usn: '1DT23CA014', name: 'HEMANTH L', present: true },
    { id: '15', usn: '1DT23CA015', name: 'KALUGURI TEJA', present: true },
    { id: '16', usn: '1DT23CA016', name: 'KEERTHANA DINESH', present: true },
    { id: '17', usn: '1DT23CA017', name: 'KRITHIKA N', present: true },
    { id: '18', usn: '1DT23CA018', name: 'LAKSHY MISHRA', present: true },
    { id: '19', usn: '1DT23CA019', name: 'MALVIYA MAYANK VIJAY', present: true },
    { id: '20', usn: '1DT23CA020', name: 'MANAN DOKWAL', present: true },
    { id: '21', usn: '1DT23CA021', name: 'MANISH N JOG', present: true },
    { id: '22', usn: '1DT23CA022', name: 'MARWAN YAKOOB MATTUVAYIL', present: true },
    { id: '23', usn: '1DT23CA023', name: 'MATHAMSETTY SATYA PRAVINYA', present: true },
    { id: '24', usn: '1DT23CA024', name: 'MEDISETTY SATYA KSHITIJ', present: true },
    { id: '25', usn: '1DT23CA025', name: 'MOHAMED JUNAID', present: true },
    { id: '26', usn: '1DT23CA026', name: 'NEESHITH SAHAL', present: true },
    { id: '27', usn: '1DT23CA027', name: 'NITHYA M G', present: true },
    { id: '28', usn: '1DT23CA028', name: 'NITHYASHREE', present: true },
    { id: '29', usn: '1DT23CA029', name: 'NITINGOUDA SURESHGOUDA PATIL', present: true },
    { id: '30', usn: '1DT23CA030', name: 'PENCHALAPADU CHIRASMARAN SAI', present: true },
    { id: '31', usn: '1DT23CA031', name: 'POOJA REDDY', present: true },
    { id: '32', usn: '1DT23CA032', name: 'POORVIKHA M', present: true },
    { id: '33', usn: '1DT23CA033', name: 'PRAJWAL R', present: true },
    { id: '34', usn: '1DT23CA034', name: 'PRATHAM K A', present: true },
    { id: '35', usn: '1DT23CA035', name: 'PRITHVIRAJ PATIL', present: true },
    { id: '36', usn: '1DT23CA036', name: 'PUNEET PRAJAPAT', present: true },
    { id: '37', usn: '1DT23CA037', name: 'PUNYA P', present: true },
    { id: '38', usn: '1DT23CA038', name: 'R MONISH', present: true },
    { id: '39', usn: '1DT23CA039', name: 'RAKSHITH H D', present: true },
    { id: '40', usn: '1DT23CA040', name: 'RANJAN S', present: true },
    { id: '41', usn: '1DT23CA041', name: 'RAYADURGAM CHAITANYA RAMKUMAR', present: true },
    { id: '42', usn: '1DT23CA042', name: 'RITURAJ SINGH', present: true },
    { id: '43', usn: '1DT23CA043', name: 'RUCHITHA K', present: true },
    { id: '44', usn: '1DT23CA044', name: 'RUPARAM K', present: true },
    { id: '45', usn: '1DT23CA045', name: 'RUPESH P', present: true },
    { id: '46', usn: '1DT23CA046', name: 'SANDEEP K', present: true },
    { id: '47', usn: '1DT23CA047', name: 'SARTHAK UPADHYAY', present: true },
    { id: '48', usn: '1DT23CA048', name: 'SEBASTIAN MATHEW', present: true },
    { id: '49', usn: '1DT23CA049', name: 'SHASHANK B', present: true },
    { id: '50', usn: '1DT23CA050', name: 'SHASWAT MISHRA', present: true },
    { id: '51', usn: '1DT23CA051', name: 'SHREYAS R', present: true },
    { id: '52', usn: '1DT23CA052', name: 'SIRIPI RAGHU RAM', present: true },
    { id: '53', usn: '1DT23CA053', name: 'SUDARSHAN SAI YASHAS BOGGARAPU', present: true },
    { id: '54', usn: '1DT23CA054', name: 'SUDEEP GOWDA K N', present: true },
    { id: '55', usn: '1DT23CA055', name: 'SUJAY B J', present: true },
    { id: '56', usn: '1DT23CA056', name: 'SUPRIYA S', present: true },
    { id: '57', usn: '1DT23CA057', name: 'TERRENCE INFANT J', present: true },
    { id: '58', usn: '1DT23CA058', name: 'THANMAYI URS', present: true },
    { id: '59', usn: '1DT23CA059', name: 'THANUSH M', present: true },
    { id: '60', usn: '1DT23CA060', name: 'THOMAS A FERNANDES', present: true },
    { id: '61', usn: '1DT23CA061', name: 'VISHVAS', present: true },
    { id: '62', usn: '1DT23CA062', name: 'YAGNESH REDDY BOLLA', present: true },
    { id: '63', usn: '1DT23CA063', name: 'ZOYA FATHIMA', present: true },
    { id: '64', usn: '1DT23CA400', name: 'Aditya Gajanan Mundase', present: true },
    { id: '65', usn: '1DT23CA401', name: 'Chandu R', present: true },
    { id: '66', usn: '1DT23CA402', name: 'G Surya Karthik', present: true },
    { id: '67', usn: '1DT23CA403', name: 'Thara H C', present: true },
    { id: '68', usn: '1DT23CA404', name: 'Vikram Shivappa Gali', present: true }
  ]);

  const [absentNumbers, setAbsentNumbers] = useState<string>('');

  const handleToggleAttendance = (studentId: string) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, present: !student.present }
        : student
    ));
  };

  const handleAbsentNumbersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbsentNumbers(e.target.value);
  };

  const markAbsentees = () => {
    const numbers = absentNumbers
      .split(/[,\s]+/)
      .map(num => num.trim())
      .filter(num => num !== '');

    setStudents(students.map(student => {
      const studentNumber = student.usn.slice(-3); // Get last 3 digits
      return {
        ...student,
        present: !numbers.includes(studentNumber)
      };
    }));
    setAbsentNumbers('');
  };

  const handleGenerateReport = () => {
    const attendanceRecord: AttendanceRecord = {
      date: new Date().toISOString(),
      students,
    };
    generatePDF(attendanceRecord);
  };

  return (

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance System</h1>
            </div>
            <button
              onClick={handleGenerateReport}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FileDown className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
          
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Mark Absences</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter USN numbers (e.g., 38, 25) - separate by commas or spaces
                </label>
                <textarea
                  value={absentNumbers}
                  onChange={handleAbsentNumbersChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Enter numbers: 38, 25, 40"
                />
              </div>
              <button
                onClick={markAbsentees}
                className="w-full sm:w-auto self-start sm:self-end px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Mark Absent
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <div className="overflow-hidden">
              <AttendanceTable
                students={students}
                onToggleAttendance={handleToggleAttendance}
              />
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-500">
              <p className="bg-gray-50 rounded-md p-2">
                Total Students: {students.length}
              </p>
              <p className="bg-green-50 text-green-600 rounded-md p-2">
                Present: {students.filter(s => s.present).length}
              </p>
              <p className="bg-red-50 text-red-600 rounded-md p-2">
                Absent: {students.filter(s => !s.present).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;