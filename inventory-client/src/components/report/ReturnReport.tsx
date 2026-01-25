

import exportFromJSON from 'export-from-json';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { ReturnByDateRequest } from '../../APIRequest/ReportAPI';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import type { RootState } from '../../redux/store/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const ReturnReport = () => {
  const formRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const DataList =
    useSelector((state: RootState) => state.report.ReturnByDateList) ?? [];

  const createReprotHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let formRefValue = formRef.current?.value || '';
    let toRefValue = toRef.current?.value || '';

    if (IsEmpty(formRefValue)) {
      ErrorToast('Form Date Required');
    } else if (IsEmpty(toRefValue)) {
      ErrorToast('To Date Required');
    } else {
      const fromDate = new Date(formRefValue).toISOString();
      const toDate = new Date(toRefValue + 'T23:59:59').toISOString();

      await ReturnByDateRequest(fromDate, toDate);
    }
  };

  type ExportType = 'csv' | 'xls';

  const OnExport = (exportType: ExportType, data: any[]) => {
    const fileName = 'ExpenseReport';
    if (!data || data.length === 0) return;

    const reportData = data.map(item => ({
      Date: moment(item.createdAt).format('MMM Do YYYY'),
      Product: item.products?.name,
      Brand: item.brands.name,
      Category: item.categories.name,
      Amount: item.total,
    }));

    exportFromJSON({
      data: reportData,
      fileName,
      exportType,
    });
  };

  // PDF Export Function - FIXED VERSION
  const OnExportPDF = (data: any[], totalAmount: number) => {
    if (!data || data.length === 0) {
      ErrorToast('No data to export');
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246);
    doc.text('Return Report', 14, 20);

    // Add date range
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const fromDateValue = formRef.current?.value || '';
    const toDateValue = toRef.current?.value || '';
    doc.text(
      `Period: ${moment(fromDateValue).format('MMM DD, YYYY')} - ${moment(toDateValue).format('MMM DD, YYYY')}`,
      14,
      28,
    );

    // Add total amount
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: $${totalAmount}`, 14, 36);

    // Prepare table data
    const tableData = data.map(item => [
      moment(item.createdAt).format('MMM DD, YYYY'),
      item.products?.name ?? 'N/A',
      item.brands?.name || 'N/A',
      item.categories?.name || 'N/A',
      `$${item.total}`,
    ]);

    // Use autoTable - CORRECTED
    autoTable(doc, {
      head: [['Date', 'Product', 'Brand', 'Category', 'Amount']],
      body: tableData,
      startY: 42,
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 35 },
        1: { halign: 'left', cellWidth: 40 },
        2: { halign: 'left', cellWidth: 30 },
        3: { halign: 'left', cellWidth: 50 },
        4: { halign: 'right', cellWidth: 30 },
      },
      margin: { top: 42 },
      didDrawPage: (data: any) => {
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(128);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' },
        );
      },
    });

    doc.save(`ExpenseReport_${moment().format('YYYY-MM-DD')}.pdf`);
  };

  const totalAmount = DataList?.[0]?.Total?.[0]?.totalAmount ?? 0;
  const rows = DataList?.[0]?.Rows ?? [];

  return (
    <div className="flex flex-col items-center justify-center py-10 md:px-10">
      <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-blue-500 py-5">
          Return Report by Date
        </h1>
        <form className="md:grid grid-cols-12 gap-4 w-full space-y-4 md:space-y-0 text-slate-700 items-center justify-end">
          <div className="flex flex-col col-span-6">
            <label htmlFor="date" className="font-semibold mb-2">
              Date From:
            </label>
            <Input
              id="date"
              type="date"
              className="focus-visible:ring-blue-500"
              ref={formRef}
              required
            />
          </div>
          <div className="flex flex-col col-span-6">
            <label htmlFor="dateTo" className="font-semibold mb-2">
              Date To:
            </label>
            <Input
              id="dateTo"
              type="date"
              className="focus-visible:ring-blue-500"
              ref={toRef}
              required
            />
          </div>
          <div className="flex flex-col col-span-12 md:col-span-4">
            <Button
              onClick={createReprotHandle}
              variant={'skybtn'}
              className="py-5 tracking-widest font-semibold"
            >
              Create Report
            </Button>
          </div>
        </form>
      </div>

      {DataList?.length > 0 && (
        <div className="bg-white px-6 py-6 w-full lg:w-[70%] border rounded-xl shadow-xl mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Report Summary
            </h2>
            <p className="text-lg text-gray-700">
              Total Purchase:
              <span className="font-bold text-blue-600">${totalAmount}</span>
            </p>
            <p className="text-sm text-gray-600">
              Number of Transactions:
              <span className="font-semibold">{rows.length}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => OnExport('csv', rows)} variant={'skybtn'}>
              Download CSV
            </Button>
            <Button onClick={() => OnExport('xls', rows)} variant={'skybtn'}>
              Download XLS
            </Button>
            <Button
              onClick={() => OnExportPDF(rows, totalAmount)}
              variant={'skybtn'}
            >
              Download PDF
            </Button>
          </div>

          <div className="mt-6 overflow-x-auto max-sm:hidden">
            <h3 className="text-lg font-semibold mb-3">Return Details</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Brand</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="border border-gray-300 px-4 py-2 ">
                      {moment(item.createdAt).format('MMM DD, YYYY')}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.products?.name ?? 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      {item.brands?.name || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-left ">
                      {item.categories?.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-left ">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnReport;
