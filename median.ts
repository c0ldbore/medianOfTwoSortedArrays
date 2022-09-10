/**********************
 * Title: Median of two sorted arrays
 * Author: Sidney Wittman
 * Date: 10-September-2022
 * Description:
 *  Given two sorted arrays nums1 and nums2 of size n and m respectively, return the median of two sorted arrays
 * Time: O(logm, logn) w/ O(1) aux space
 * 
 * Solution: This solution utilizes the divide and conquer method. 
 *  another efficient solution is the merge sort solution.
 * 
 **********************/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let n1 = nums1.length;
  let n2 = nums2.length;
  if (n1>n2) return findMedian(nums2, n2, nums1, n1);
  return findMedian(nums1, n1, nums2, n2);
};

// median of two ints
function medianTwo(a: number, b: number): number {
  return (a+b)/2;
}
// median of three ints
function medianThree(a: number, b: number, c: number): number {
  return a + b + c - Math.max(a, Math.max(b, c)) - Math.min(a, Math.min(b, c));
}

// median of four ints
function medianFour(a: number, b: number, c: number, d: number): number {
  let Max = Math.max(a, Math.max(b, Math.max(c, d)));
  let Min = Math.min(a, Math.min(b, Math.min(c, d)));
  return ((a+b+c+d-Max-Min)/2);
}

// Helper function to find median in a single arr
function medianArr(arr: number[], n: number) {
  // Should be no such edge case, but as a precaution
  if (n==0) return -1;
  if (n%2==0) return ((arr[Math.floor(n/2)] + arr[Math.floor(n/2-1)])/2)
  return arr[Math.floor(n/2)];
}

//main helper function
function findMedian(arr1: number[], n: number, arr2: number[], m: number): number {
  //smaller array is empty
  if (n==0) return medianArr(arr2, m);
  // if smaller array only has one element
  if (n==1) {
      // case 1: both arrays only 1 element
      if (m==1) return medianTwo(arr1[0], arr2[0]);
      // case 2: larger array odd # elements
      // only mid 3 of larger array and 1 from smaller
      if (m%2==1) return medianTwo(arr2[Math.floor(m/2)], medianThree(arr1[0], arr2[Math.floor(m/2-1)], arr2[Math.floor(m/2+1)]));
      // case 3: larger array even number elements
      // median is mid two of larger || only in smaller array
      return medianThree(arr2[Math.floor(m/2)], arr2[Math.floor(m/2-1)], arr1[0]);
  }
  // smaller array has two elements
  else if (n==2) {
      // case 4: both w/ two elements
      if (m==2) return medianFour(arr1[0], arr1[1], arr2[0], arr2[1]);
      // case 5: larger array odd #
      // median is: mid of lg array, max of first and mid of lg
      // or min of sm arr and just after mid of lg arr
      if (m%2==1) return medianThree(arr2[Math.floor(m/2)], 
                              Math.max(arr1[0], arr2[Math.floor(m/2-1)]), 
                              Math.min(arr1[1], arr2[Math.floor(m/2+1)]));
      // case 6: larger array has even elements
      // median is one of 4 elements
      // middle two of lg array, max of sm arr & mid of lg
      // or min of sm arr and after second middle of lg arr
      return medianFour(arr2[Math.floor(m/2)], arr2[Math.floor(m/2-1)],
                        Math.max(arr1[0], arr2[Math.floor(m/2-2)]), 
                        Math.min(arr1[1], arr2[Math.floor(m/2+1)]));
  }
  
  let idA = Math.floor((n-1)/2);
  let idB = Math.floor((m-1)/2);
  // arr1[idA] < arr2[idB] then must exist in second half of first array 
  // and first half of second array
  if (arr1[idA] <= arr2[idB]) {
      return findMedian(arr1.slice(idA, arr1.length),
                        Math.floor(n/2+1), arr2, m-idA);
  }
  // if arr1 > arr2
  // median must exist in first half of arr1 or second half of arr2
  return findMedian(arr1, Math.floor(n/2+1), 
                    arr2.slice(idA, arr2.length), Math.floor(m-idA));
}