const blogMong = require('../models/Blog_Mong');

// -------------------------- add blog

exports.getBlog = async (req, res) => {
    
    if (!req.session.adminEmail) {
        return res.render('adminLogin');
    } else {
        return res.render('addBlogs');
    }
    
}

exports.postAddBlogs = async (req, res) => {
    
    const { title, para_one, para_two } = req.body;

    const imagePath = `/uploads/${req.file.filename}`;

    try {
        const newBlog = new blogMong({
            title, para_one, para_two, image: imagePath
        })

        await newBlog.save();
        return res.send('<script>alert("Blog Added"); window.history.back();</script>');
    }

    catch (err) {
        return res.send('<script>alert("Unable to add"); window.history.back();</script>');
    }
    
}

// --------------------- manage blogs

exports.getManageBlog=async (req,res) => {
    
    if (!req.session.adminEmail) {
        return res.render('adminLogin');
    } else {
        const blog = await blogMong.find();
        return res.render('manageBlog', { blog });
    }
}

exports.getManageBlogApi=async (req,res) => {
    
    try {
        const blog = await blogMong.find();
        res.json(blog);
    } catch (error) {
        console.log(error.message);
    }

}

// --------------------- edit blog

exports.getEditBlog = async (req, res) => {

    if (!req.session.adminEmail) {
        return res.render('adminLogin');
    } else {
        const editBlog = await blogMong.findById(req.params.id);
        return res.render('editBlog', { editBlog });
    }
}

// -------------------- update blog

exports.postEditBlog=async (req,res) => {
    
    try {
        const { title, para_one, para_two } = req.body;

        await blogMong.findByIdAndUpdate(req.params.id, {
            title, para_one, para_two
        })

        return res.redirect('/admin/manage-blog');

    } catch (error) {
        return res.send('<script>alert("Unable to Edit"); window.history.back();</script>');
    }

}

// -------------------- delete blog

exports.deleteBlog = async (req, res) => {
        
    try {
        await blogMong.findByIdAndDelete(req.params.id);
        return res.redirect('/admin/manage-blog');
    } catch (error) {
        return res.send('<script>alert("Unable to delete"); window.history.back();</script>');
    }

}

// --------------------- edit blog image

exports.getEditBlogImg=async (req,res) => {
    
    try {
        const { imgId, imgIndex } = req.params;

        const blogId = await blogMong.findById(imgId);

        if (!blogId) {
        return res.send('<script>alert("Blog Not Found"); window.history.back();</script>');
        }
        
        const blogIndex = blogId.image;

        if (!blogIndex) {
        return res.send('<script>alert("Image Not Found"); window.history.back();</script>');
        }
        
        return res.render('editBlogImage', { blogIndex, imgId, imgIndex });

    }
    catch (err) {
        return res.send('<script>alert("Error Occured"); window.history.back();</script>');
    }

}

// --------------------------------- post edit image

exports.postEditImage = async (req, res) => {
    
     try {
          const { imgId, imgIndex } = req.params;
          const file = req.file;
    
          if (!file) {
            return res.send("no blog found");
          }
    
          const blogg = await blogMong.findById(imgId);
    
          if (!blogg) {
            return res.send("no blog found");
          }
    
          if (!blogg.image[imgIndex]) {
            return res.send("no blog image found");
          }
    
          const newimagepath = `/uploads/${file.filename}`;
          blogg.image = newimagepath;
    
         await blogg.save();
         
         return res.send(`<script>alert("Image has Changed");window.location.href = "/admin/edit-blog/${blogg._id}";
         </script>`);

         
        } catch (err) {
          res.send('check network connection');
        }

}
