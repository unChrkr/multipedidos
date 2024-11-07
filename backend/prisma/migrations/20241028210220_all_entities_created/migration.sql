-- CreateEnum
CREATE TYPE "ConsumableType" AS ENUM ('starter', 'mainCourse', 'dessert', 'drink');

-- CreateTable
CREATE TABLE "ConsumableEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,
    "type" "ConsumableType" NOT NULL,

    CONSTRAINT "ConsumableEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationEntity" (
    "id" SERIAL NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,
    "dayTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ReservationEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservationEntity_userId_key" ON "ReservationEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_email_key" ON "UserEntity"("email");

-- AddForeignKey
ALTER TABLE "ReservationEntity" ADD CONSTRAINT "ReservationEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
