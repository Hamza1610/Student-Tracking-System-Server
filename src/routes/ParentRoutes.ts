import { Router } from 'express';
import {
  createParent,
  getParents,
  getParentById,
  updateParent,
  deleteParent,
} from '../controllers/ParentController';

const router = Router();

router.post('/', createParent);
router.get('/', getParents);
router.get('/:id', getParentById);
router.put('/:id', updateParent);
router.delete('/:id', deleteParent);

export default router;