const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./modules/auth/authRoutes');
const adminController = require('./modules/admin/adminController.js');
const homeController = require('./modules/home/homeController.js');
const immfutController = require('./modules/imm&fut_sameapi/immfutController.js');
const immediateOrderController = require('./modules/immediateOrder/immediateOrderController.js');
const futureOrderController = require('./modules/futureOrder/futureOrderController.js');
const pendingOrderListController = require('./modules/pendingOrderList/pendingOrderListController.js');
const deliveryOrderListController = require('./modules/deliveryOrderList/deliveryOrderListController.js');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/auth', authRoutes);
app.use('/admin', adminController);
app.use('/home', homeController);
app.use('/immfut', immfutController);
app.use('/immediate', immediateOrderController);
app.use('/future', futureOrderController);
app.use('/pending_list', pendingOrderListController);
app.use('/delivery_list', deliveryOrderListController);

app.listen(8001, () => {
    console.log("listening");
})













