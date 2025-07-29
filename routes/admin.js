const express = require('express');
const router = express.Router();
const { getadminLogin, postadminLogin, postadminSignup, getadminSignup, getAdminDash, getChangePassword, postchangePassword, getadminSignout, getForgetPass, postForgetPass, verifyOtp, resetForgetPassword, adminDashboard } = require('../controllers/adminAuthentication');
const { getBlog, postAddBlogs, getManageBlog, getEditBlog, deleteBlog, postEditBlog, getEditBlogImg, postEditImage, getManageBlogApi } = require('../controllers/blogsManager');
const uploads = require('../middleware/multer');
const { postQuery, getManageQuery, deleteQuery } = require('../controllers/queryController');

// ------------------ admin 

router.get('/signup', getadminSignup);
router.post('/signup', postadminSignup);
router.get('/login', getadminLogin);
router.post('/login', postadminLogin);
router.get('/dashboard', adminDashboard);
router.get('/change-password', getChangePassword);
router.post('/change-password', postchangePassword);
router.get('/signout', getadminSignout);

router.get('/forget-password', getForgetPass);
router.post('/forget-password', postForgetPass);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetForgetPassword);

// ----------------- blogs

router.get('/add-blog', getBlog);
router.post('/add-blog', uploads.single('image'), postAddBlogs);
router.get('/manage-blog', getManageBlog);
router.get('/manage-blogapi', getManageBlogApi);
router.get('/edit-blog/:id', getEditBlog);
router.post('/edit-blog/:id', postEditBlog);
router.get('/delete-blog/:id', deleteBlog);

router.get('/edit-image/:imgId/:imgIndex', uploads.single("file"), getEditBlogImg);
router.post('/edit-image/:imgId/:imgIndex', uploads.single("file"), postEditImage);

// ----------------- queries

router.post('/user-query', postQuery);
router.get('/manage-queries', getManageQuery);
router.get('/delete-query/:id', deleteQuery);

module.exports = router;