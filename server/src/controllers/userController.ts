import { Request, Response } from 'express';
import pool drom '../utils/db.js'

export const getProfile = async (req: Request, res: Response) => {
  const user = (req as any).user || { id: 'anonymous' };
  res.status(200).json({ message: 'get profile (placeholder)', user });
};

export const updateProfile = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'update profile (placeholder)', updates: req.body });
};

export const updateUsername = async (req: Request, res: Response) => {
  try{
    const userId = (req as any)user?.id;
    const { username } = req.body;

    if (!username || username.trim().length<3){
      return res.status(400).json({
        error: 'Username must be at least 3 characters long'
      });
    }

    if (username.trim().length>20){
      return res.status(400).json({
        error: 'Username must be less than 10 chracters'
      });    
    }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username.trim())){
        return res.status(400).json({
          error: 'Username can only contain letters, numbers , and underscores'
        });
      }

      const formattedUsername = username.trim().toLowerCase();

      // checking username avaliability

      const checkQuery = 'SELECT id FROM users WHERE username = $1 AND id != $2';
      const checkResult = await pool.query(checkQuery, [formattedUsername , userId]);
      if (checkResult.rows.length>0){
        return res.status(400).json({error: Username is already taken! Try another one'});
      }

      // updating username in database

      const updateQuery = 'UPDATE users SET username = $1 WHERE is = $2 RETURNING id, username, email';
      const updateResult = await pool.query(updateQuery, [formattedUsername, userId]);

      res.status(200).json({
        success: true,
        message: 'Username updates successfully!',
        data:{
          username: formattedUsername,
          publicUrl: 'kraafters/${formattedUsername}',
          user: updateResult.rows[0]
        }
      });

    } catch (error) {
      console.error('Update username error:',error);
      res.status(500).json({error : 'Internal server error'});
    } 
export const uploadProfilePicture= async (req: Request, res: Response)=>{
  try{
    const userId = (req as any).user?Id;
    if(!userId){
      return res.status(400).json({error: 'User not authenticated'});
    }
     // checks if file uploaded
    if(!req.file){
      return res.status(400).json({error: 'No file uploaded'});
    }
    // validate file type
    const allowedMimeTypes = ['image/jpeg' , 'image/png' , 'image/gif' , 'image/webp'];
    if(!allowedMimeTypes.includes(req.file.mimetype)){
         // delete the uploaded file if invaild
         if (req.file.path){
          FileSystem.unlink.Sync(req.file.path);
         }
         return res.status(400).json({
          error: 'Invalid file type. Only JPEG , PNG GIF AND webp are allowed.'
         });
    }

    // Validate file size (max 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      // Delete the uploaded file if too large
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 5MB.' 
      });
    }

    // Create file path for database
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    // First, get current avatar to delete old file
    const getQuery = 'SELECT avatar FROM users WHERE id = $1';
    const userResult = await pool.query(getQuery, [userId]);

    if (userResult.rows.length === 0) {
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete old avatar file if it exists
    const currentAvatar = userResult.rows[0].avatar;
    if (currentAvatar) {
      try {
        const oldFilename = path.basename(currentAvatar);
        const oldFilePath = path.join('uploads/avatars', oldFilename);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (fileError) {
        console.error('Error deleting old avatar file:', fileError);
      }
    }

    // Update user's avatar in database
    const updateQuery = `
      UPDATE users 
      SET avatar = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING id, username, email, name, avatar, bio, theme_color
    `;
    
    const updateResult = await pool.query(updateQuery, [avatarPath, userId]);

    // SUCCESS RESPONSE
    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: {
        user: updateResult.rows[0],
        avatarUrl: avatarPath
      }
    });

  } catch (error) {
    console.error('Upload profile picture error:', error);
    
    // Delete the uploaded file if error occurred
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

 // DELETE PROFILE PICTURE
 // DELETE /api/users/me/avatar
 // Removes user's profile picture
export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // First, get current avatar to delete the file
    const getQuery = 'SELECT avatar FROM users WHERE id = $1';
    const userResult = await pool.query(getQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentAvatar = userResult.rows[0].avatar;

    // Delete the physical file if it exists
    if (currentAvatar) {
      try {
        const filename = path.basename(currentAvatar);
        const filePath = path.join('uploads/avatars', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error('Error deleting avatar file:', fileError);
        // Continue with database update even if file deletion fails
      }
    }

    // Update database to remove avatar
    const updateQuery = `
      UPDATE users 
      SET avatar = NULL, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING id, username, email, name, avatar, bio, theme_color
    `;
    
    const updateResult = await pool.query(updateQuery, [userId]);

    res.status(200).json({
      success: true,
      message: 'Profile picture deleted successfully',
      data: {
        user: updateResult.rows[0]
      }
    });

  } catch (error) {
    console.error('Delete profile picture error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

 // UPDATE PROFILE (Full Update)
 // PUT /api/users/me
 // Updates user profile information (name, email, bio, theme color)

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { name, email, bio, themeColor } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Validate theme color format if provided
    if (themeColor && !/^#[0-9A-F]{6}$/i.test(themeColor)) {
      return res.status(400).json({ 
        error: 'Invalid theme color format. Use hex format (#RRGGBB)' 
      });
    }

    // Check if email is already taken by another user
    if (email) {
      const emailCheckQuery = 'SELECT id FROM users WHERE email = $1 AND id != $2';
      const emailResult = await pool.query(emailCheckQuery, [email, userId]);
      
      if (emailResult.rows.length > 0) {
        return res.status(400).json({ error: 'Email is already taken' });
      }
    }

    // Build dynamic update query based on provided fields
    let updateFields = [];
    let values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (email !== undefined) {
      updateFields.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (bio !== undefined) {
      updateFields.push(`bio = $${paramCount}`);
      values.push(bio);
      paramCount++;
    }

    if (themeColor !== undefined) {
      updateFields.push(`theme_color = $${paramCount}`);
      values.push(themeColor);
      paramCount++;
    }

    // Add updated timestamp and user ID
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    if (updateFields.length === 1) { // Only updated_at was added
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updateQuery = `
      UPDATE users 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING id, username, email, name, avatar, bio, theme_color, created_at, updated_at
    `;

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user,
        publicUrl: `krafters/${user.username}`
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

 // DELETE USER PROFILE
 // DELETE /api/users/me
 // Permanently deletes user account (requires password confirmation)
 
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { password } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required to delete account' });
    }

    // Get user to verify password and avatar
    const getUserQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(getUserQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete avatar file if exists
    if (user.avatar) {
      try {
        const filename = path.basename(user.avatar);
        const filePath = path.join('uploads/avatars', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error('Error deleting avatar file during account deletion:', fileError);
      }
    }

    // Delete user from database
    const deleteQuery = 'DELETE FROM users WHERE id = $1';
    await pool.query(deleteQuery, [userId]);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};