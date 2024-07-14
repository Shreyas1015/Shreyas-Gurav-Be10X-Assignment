-- CreateTable
CREATE TABLE "blogs" (
    "bid" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("bid")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
