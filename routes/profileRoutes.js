const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middlewares/authMiddleware');
const User = require('../models/user');

// 🔧 Configure Multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-pics');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${req.user._id}${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only JPEG or PNG allowed'), false);
};
const upload = multer({ storage, fileFilter });

// ✅ Upload Profile Picture
router.post('/upload', authMiddleware, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.profilePicUrl = `/uploads/profile-pics/${req.file.filename}`;
    await user.save();
     const fullUrl = `http://localhost:5000/uploads/profile-pics/${req.file.filename}`;
    res.json({ message: 'Profile picture updated', profilePicUrl:  fullUrl});
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// ✅ Delete Profile Picture
router.delete('/remove', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.profilePicUrl) {
      const filePath = `.${user.profilePicUrl}`;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      user.profilePicUrl = '';
      await user.save();
    }
    res.json({ message: 'Profile picture deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;
