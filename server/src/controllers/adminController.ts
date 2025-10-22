import { Request, Response } from "express";
import pool from '../utils/db.js';

export const getAllUsers = async (req: Request, res: Response) => {

  try{
    const result = await pool.query("SELECT * FROM User");

    res.status(200).json({
      success:true,
      count:result.rows.length,
      data:result.rows
    });
}
  catch(error){
    console.log(`Error fetching users from database`,error);
    res.status(500).json({
      success:false,
      message:"error fetching details from db"

    });

  
  }
};  

export const getPendingApprovals = async (req: Request, res: Response) => {

  try{
    const result = await pool.query("SELECT id, email, username, createdAt FROM User WHERE approvalStatus = 'PENDING' ORDER BY createdAt DESC");

    res.status(200).json({
      success:true,
      count:result.rows.length,
      data:result.rows
    });
  }
  catch(error){
    console.log(`Error`,error);
    res.status(500).json({
      success:false,
      message:"error fetching pending users"

    });
  }
}

export const approveUser = async (req: Request, res: Response) => {
  try{
    const user_id=req.params.id;

    const result= await pool.query(`UPDATE User SET approvalStatus ='APPROVED' WHERE id = ${user_id} RETURNING *`);

    if(result.rowCount===0){
      return res.status(404).json({
        success:false,
        message:"User not found in database"

      });
    }
    res.status(200).json({
      success:true,
      message:"User approved",
      data:result.rows[0]
    });
  }
  catch(error){
    console.log('error',error);
    res.status(500).json({
      success:false,
      message:"Error approving User"
    });
  }

}

export const rejectUser = async (req: Request, res: Response) => {
  try{
    const user_id=req.params.id;

    const result= await pool.query(`UPDATE User SET approvalStatus ='REJECTED' WHERE id = ${user_id} RETURNING *`);

    if(result.rowCount===0){
      return res.status(404).json({
        success:false,
        message:"User not found in database"

      });
    }
    res.status(200).json({
      success:true,
      message:"User Rejected",
      data:result.rows[0]
    });
  }
  catch(error){
    console.log('error',error);
    res.status(500).json({
      success:false,
      message:"Error Rejecting User"
    });
  }

  res.status(200).json({ message: "rejectUser endpoint (placeholder)" });
}

export const loginAdmin = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(200).json({ message: "loginAdmin endpoint (placeholder)" });   
}