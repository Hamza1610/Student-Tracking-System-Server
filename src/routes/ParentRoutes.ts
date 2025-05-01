import { Router } from 'express';
import {
  createParent,
  getParents,
  getParentByUId,
  updateParent,
  deleteParent,
  updateParentStudent,
} from '../controllers/ParentController';

const router = Router();

router.post('/', createParent);
router.get('/', getParents);
router.get('/:id', getParentByUId);
router.put('/:id', updateParentStudent);
router.delete('/:id', deleteParent);

export default router;