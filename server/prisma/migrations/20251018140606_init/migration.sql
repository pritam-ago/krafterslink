-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('HEAD', 'LEAD', 'MEMBER');

-- CreateEnum
CREATE TYPE "UserDomain" AS ENUM ('DEVELOPMENT', 'CREATIVES', 'CP', 'CYBER_SECURITY', 'WEB3', 'PR', 'CONTENT');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('GITHUB', 'LINKEDIN', 'TWITTER', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'BEHANCE', 'DRIBBBLE', 'MEDIUM', 'PORTFOLIO', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL,
    "domain" "UserDomain" NOT NULL,
    "bio" TEXT,
    "avatar" VARCHAR(500),
    "profile_slug" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100),
    "specialization" VARCHAR(100),
    "section" VARCHAR(100),
    "theme" VARCHAR(50) DEFAULT 'default',
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "display_name" VARCHAR(100),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_slug_key" ON "users"("profile_slug");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_uuid_idx" ON "users"("uuid");

-- CreateIndex
CREATE INDEX "users_profile_slug_idx" ON "users"("profile_slug");

-- CreateIndex
CREATE INDEX "users_domain_idx" ON "users"("domain");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "social_links_user_id_idx" ON "social_links"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_user_id_platform_key" ON "social_links"("user_id", "platform");

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
