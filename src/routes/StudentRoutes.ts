import { Router } from 'express';
import {
  createStudent,
  getStudents,
  getStudentByUId,
  updateStudent,
  deleteStudent,
} from '../controllers/StudentController';

const router = Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentByUId);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;