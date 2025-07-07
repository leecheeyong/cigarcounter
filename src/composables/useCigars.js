import { ref, computed } from "vue";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const cigars = ref([]);
const loading = ref(false);
const error = ref("");

export const useCigars = () => {
  const { user } = useAuth();

  const addCigar = async (cigarData) => {
    if (!user.value) {
      return { success: false, error: "User not authenticated" };
    }

    try {
      loading.value = true;
      error.value = "";

      await addDoc(collection(db, "cigars"), {
        ...cigarData,
        userId: user.value.uid,
        smokedAt: serverTimestamp(),
      });

      return { success: true };
    } catch (err) {
      console.error("Error adding cigar:", err);
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const loadCigars = () => {
    if (!user.value) {
      console.log("No user authenticated");
      return;
    }

    try {
      // First try with ordering (requires composite index)
      const qWithOrder = query(
        collection(db, "cigars"),
        where("userId", "==", user.value.uid),
        orderBy("smokedAt", "desc"),
      );

      return onSnapshot(
        qWithOrder,
        (snapshot) => {
          console.log(
            "Firestore snapshot received:",
            snapshot.size,
            "documents",
          );
          cigars.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          cigars.value.sort((a, b) => {
            const aTime = a.smokedAt?.toDate
              ? a.smokedAt.toDate().getTime()
              : 0;
            const bTime = b.smokedAt?.toDate
              ? b.smokedAt.toDate().getTime()
              : 0;
            return bTime - aTime;
          });

          console.log("Cigars loaded and sorted:", cigars.value.length);
          error.value = "";
        },
        (err) => {
          console.error("Error with ordered query, trying fallback:", err);

          const qFallback = query(
            collection(db, "cigars"),
            where("userId", "==", user?.value?.uid),
          );

          return onSnapshot(
            qFallback,
            (snapshot) => {
              console.log(
                "Fallback query - Firestore snapshot received:",
                snapshot.size,
                "documents",
              );
              cigars.value = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              cigars.value.sort((a, b) => {
                const aTime = a.smokedAt?.toDate
                  ? a.smokedAt.toDate().getTime()
                  : 0;
                const bTime = b.smokedAt?.toDate
                  ? b.smokedAt.toDate().getTime()
                  : 0;
                return bTime - aTime;
              });

              console.log(
                "Cigars loaded with fallback query:",
                cigars.value.length,
              );
              error.value = "";
            },
            (fallbackErr) => {
              console.error("Error loading cigars with fallback:", fallbackErr);
              error.value = fallbackErr.message;
            },
          );
        },
      );
    } catch (err) {
      console.error("Error setting up cigars listener:", err);
      error.value = err.message;
    }
  };

  const stats = computed(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayCigars = cigars.value.filter((c) => {
      const cigarDate = c.smokedAt?.toDate
        ? c.smokedAt.toDate()
        : new Date(c.smokedAt);
      return cigarDate >= today;
    });

    const weekCigars = cigars.value.filter((c) => {
      const cigarDate = c.smokedAt?.toDate
        ? c.smokedAt.toDate()
        : new Date(c.smokedAt);
      return cigarDate >= thisWeek;
    });

    const monthCigars = cigars.value.filter((c) => {
      const cigarDate = c.smokedAt?.toDate
        ? c.smokedAt.toDate()
        : new Date(c.smokedAt);
      return cigarDate >= thisMonth;
    });

    return {
      total: cigars.value.length,
      today: todayCigars.length,
      thisWeek: weekCigars.length,
      thisMonth: monthCigars.length,
      totalCost: cigars.value.reduce((sum, c) => sum + (c.cost || 0), 0),
    };
  });

  return {
    cigars: computed(() => cigars.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    stats,
    addCigar,
    loadCigars,
  };
};
