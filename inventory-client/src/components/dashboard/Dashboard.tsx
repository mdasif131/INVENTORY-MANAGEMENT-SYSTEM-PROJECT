import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ExpenseSummaryRequest, PurchaseSummaryRequest, ReturnSummaryRequest, SalesSummaryRequest } from "../../APIRequest/SummaryAPIRequest";
import type { RootState } from "../../redux/store/store";

const Dashboard = () => {
  const hasLoadedDropdowns = useRef(false);
  const ExpenseData = useSelector(
    (state: RootState) => state.summary.ExpenseSummaryList,
  );
  const SalesData = useSelector(
    (state: RootState) => state.summary.SalesSummaryList,
  );
  const ReturnData = useSelector(
    (state: RootState) => state.summary.ReturnSummaryList,
  );
  const PurchaseData = useSelector(
    (state: RootState) => state.summary.PurchaseSummaryList,
  );
  const totalAmount1 = ExpenseData?.[0]?.Total?.[0]?.totalAmount ?? 0;
  const totalAmount2 = SalesData?.[0]?.Total?.[0]?.totalAmount ?? 0;
  const totalAmount3 = ReturnData?.[0]?.Total?.[0]?.totalAmount ?? 0;
  const totalAmount4 = PurchaseData?.[0]?.Total?.[0]?.totalAmount ?? 0;

  // Format data for charts
  const expenseChartData = ExpenseData?.[0]?.last30Days ?? [];
  const salesChartData = SalesData?.[0]?.last30Days ?? [];
  const purchaseChartData = PurchaseData?.[0]?.last30Days ?? [];
  
  const pieData = [
    { name: 'Expenses', value: totalAmount1 },
    { name: 'Sales', value: totalAmount2 },
    { name: 'Purchase', value: totalAmount4 },
    { name: 'Returns', value: totalAmount3 },
  ];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  useEffect(() => {
    if (hasLoadedDropdowns.current) return;
    hasLoadedDropdowns.current = true;
    (async () => {
      await ExpenseSummaryRequest();
      await SalesSummaryRequest();
      await ReturnSummaryRequest();
      await PurchaseSummaryRequest();
    })();
  });

  return (
    <section className="bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        {/* total  */}
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-gray-600 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md py-8 px-6">
            <p className="text-xl font-bold text-blue-600">
              ${totalAmount1.toLocaleString()}
            </p>
            <h1 className="text-xl font-semibold text-gray-500">
              Total Expense
            </h1>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md py-8 px-6">
            <p className="text-xl font-bold text-green-600">
              ${totalAmount2.toLocaleString()}
            </p>
            <h1 className="text-xl font-semibold text-gray-500">Total Sale</h1>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md py-8 px-6">
            <p className="text-xl font-bold text-amber-600">
              ${totalAmount4.toLocaleString()}
            </p>
            <h1 className="text-xl font-semibold text-gray-500">
              Total Purchase
            </h1>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md py-8 px-6">
            <p className="text-xl font-bold text-red-600">
              ${totalAmount3.toLocaleString()}
            </p>
            <h1 className="text-xl font-semibold text-gray-500">
              Total Return
            </h1>
          </div>
        </div>

        {/* Charts  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Expense Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Expense Trend (Last 30 Days)
            </h2>
            {expenseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={expenseChartData}>
                  <defs>
                    <linearGradient
                      id="colorExpense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip formatter={value => `$${value?.toLocaleString()}`} />
                  <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No data available
              </p>
            )}
          </div>

          {/* Sales Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sales Trend (Last 30 Days)
            </h2>
            {salesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesChartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip formatter={value => `$${value?.toLocaleString()}`} />
                  <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No data available
              </p>
            )}
          </div>

          {/* Purchase Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Purchase Trend (Last 30 Days)
            </h2>
            {purchaseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={purchaseChartData}>
                  <defs>
                    <linearGradient
                      id="colorPurchase"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip formatter={value => `$${value?.toLocaleString()}`} />
                  <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorPurchase)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No data available
              </p>
            )}
          </div>

          {/* Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Overall Distribution
            </h2>
            {pieData.some(item => item.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name}: $${value.toLocaleString()}`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={value => `$${value?.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No data available
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};;;

export default Dashboard;
