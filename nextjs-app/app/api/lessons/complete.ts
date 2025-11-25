import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, collections } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
