/* 
 * escape_start.c
 * 
 * Welcome to the beginning of the CS 40 Escape Room Challenge! 
 * 
 * You are in an escape room and are tasked with solving a series of puzzles 
 * in order to break out. Doing so may require working solutions of all CS 40 
 * assignments (filesofpix, iii, locality, arith, bomb, um, profiling, and asmcoding) 
 * and general knowledge of CS 40 concepts.
 * 
 * The starting files for the challenge are:
 *  - escape_start: Compiled executable
 *  - escape_start.c: This file; the driver file for escape_start
 * 
 * Acknowledgements:
 * - Elliot Bonner for creating a similar puzzle that inspired this one.
 * - Megan Monroe for writing a PGM image corruptor that I used to help make part of 
 *   this puzzle.
 * - Jasper Geer for providing a UM-C to UMASM compiler which I used to help make 
 *   part of this puzzle (link here: https://github.com/jaspergeer/jumcc/).
 * - Dan Bergen for helping test this out.
 * 
 * Written by: Randy Dang, Tufts University, November 2023
 * 
 * Good luck, and have fun! :)
 */

#include <stdio.h>
#include <stdlib.h>

/* 
 * reads a line, not including the newline character, from fp and returns 
 * the line as a C-string. The caller is responsible for freeing memory 
 * allocated by this function by calling `free` on the returned pointer.
 */
extern char *read_line(FILE *fp);

/*
 * Checks if `password` is correct and calls correct() if it is and 
 * incorrect() if it is not.
 */
extern void check_password(char *password);

int main()
{
        fprintf(stderr, "Password: ");
        
        /* 
         * Reads a line from stdin, not including the newline character, 
         * and stores it as a C-string in `input` 
         */
        char *input = read_line(stdin);

        check_password(input);

        free(input);

        return EXIT_SUCCESS;
}