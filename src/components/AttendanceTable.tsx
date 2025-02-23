import React from 'react';
import { Check, X } from 'lucide-react';
import { Student } from '../types';

interface AttendanceTableProps {
  students: Student[];
  onToggleAttendance: (studentId: string) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ students, onToggleAttendance }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USN
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.usn}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {student.present ? (
                    <span className="text-green-600 flex items-center">
                      <Check size={16} className="mr-1 flex-shrink-0" />
                      <span className="hidden sm:inline">Present</span>
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <X size={16} className="mr-1 flex-shrink-0" />
                      <span className="hidden sm:inline">Absent</span>
                    </span>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onToggleAttendance(student.id)}
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-sm ${
                      student.present
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    <span className="hidden sm:inline">
                      {student.present ? 'Mark Absent' : 'Mark Present'}
                    </span>
                    <span className="sm:hidden">
                      {student.present ? 'Absent' : 'Present'}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;