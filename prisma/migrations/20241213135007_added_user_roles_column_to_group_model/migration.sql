-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userRoles" "UserRole"[] DEFAULT ARRAY['USER', 'PAID_USER', 'VIP_USER', 'ADMIN']::"UserRole"[];
