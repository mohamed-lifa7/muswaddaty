// "use client"
// import { useEffect, useState } from 'react';
// import { type Document, PrismaClient } from '@prisma/client';
// import { db } from '@/server/db';


// export function useDocument(documentId:string) {
//   const [document, setDocument] = useState<Document|null>(null);

//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         const result = await db.document.findUnique({
//           where: {
//             id: documentId
//           }
//         });
//         setDocument(result);
//       } catch (error) {
//         console.error('Error fetching document:', error);
//       }
//     };

//     fetchDocument();

//     // Clean-up function
//     return () => {
//       // Cleanup logic (if any)
//     };
//   }, [documentId]);

//   return document;
// }
