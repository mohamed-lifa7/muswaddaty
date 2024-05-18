// import { useState, useEffect } from 'react';
// import { db } from '@/lib/db';

// export function useUpdateDoc(documentId: string, content: string) {
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [error, setError] = useState<unknown>(null);

//   const updateDocument = async () => {
//     setIsUpdating(true);
//     setError(null);

//     try {
//       const updatedDocument = await db.document.update({
//         where: {
//           id: documentId
//         },
//         data: {
//           content
//         }
//       });

//       setIsUpdating(false);
//       return updatedDocument;
//     } catch (error) {
//       setError(error);
//       setIsUpdating(false);
//       console.error('Error updating document:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     // Trigger updateDocument function when documentId or content changes
//     updateDocument();
//   }, [documentId, content]);

//   return { isUpdating, error };
// }
