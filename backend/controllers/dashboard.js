const Order = require("../models/Order");
const Users = require("../models/User");

//dashboard data
exports.getDashboardStats = async (req, res) => {
  try {
    const totalSalesAgg  = await Order.aggregate([
      { $group: {_id:null,totalSales: {$sum:"$totalAmount"}}}
    ]);
    const totalSales = totalSalesAgg[0]?.totalSales || 0;

    const totalOrders = await Order.countDocuments();

    const totalCustomers = await Users.countDocuments();

    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(),now.getMonth(),1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth()-1,1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(),0);

    const thisMonthSales = await Order.aggregate([
      {$match:{createdAt: {$gte:firstDayThisMonth}}},
      {$group: {_id:null,total:{$sum:"$totalAmount"}}}
    ]);

    const lastMonthSales = await Order.aggregate([
      {$match:{createdAt:{$gte:firstDayLastMonth,$lte:lastDayLastMonth}}},
      {$group:{_id:null,total:{$sum:"$totalAmount"}}}
    ]);

    const growth = lastMonthSales[0]?.total >0
    ? ((thisMonthSales[0]?.total || 0)- lastMonthSales[0].total) /
    lastMonthSales[0].total *100 :0;

    const salesByMonth = await Order.aggregate([
      {
        $group:{
          _id:{$month:"$createdAt"},
          sales:{$sum:"$totalAmount"}
        }
      },
      {$sort: {"_id":1 } }
    ]);

    const salesChart  = salesByMonth.map(item =>({
      month:new Date(0,item._id -1).toLocaleString("default", {month:"short"}),
      sales:item.sales
    }));

    const recentOrders = await Order.find()
    .sort({ createdAt: -1})
    .limit(5);

    res.json({
      totalSales,
      totalOrders,
      totalCustomers,
      revenueGrowth: growth.toFixed(2),
      salesChart,
      recentOrders
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({error:err.message});
  }
};