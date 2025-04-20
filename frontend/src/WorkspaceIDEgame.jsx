import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import animalSpriteRef from './animalSpritesRef';

// Import CodeMirror v6 components
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

//import selectedAnimalAndActions from './AnimalTings/selectedAnimalAndActions'
// This file manages the full workspace layout with:
// - LeetCode problem display (left)
// - Phaser game instance (right)
// - Code editor (bottom)

const WorkspaceIDEGame = () => {
  const gameRef = useRef(null);
  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Phaser game
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      parent: gameRef.current,
      scene: [animalSpriteRef]
    };
    
    const game = new Phaser.Game(config);
    
    return () => {
      game.destroy(true);
    };
  }, []);

  // Initialize code editor with CodeMirror v6
  useEffect(() => {
    if (editorRef.current && !editorView) {
      const startState = EditorState.create({
        doc: '// Write your code here\n',
        extensions: [
          keymap.of(defaultKeymap),
          javascript(),
          oneDark,
          EditorView.lineWrapping,
          EditorView.theme({
            "&": {
              height: "100%",
              fontSize: "14px"
            }
          })
        ]
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current
      });
      
      setEditorView(view);

      // Resize handling is built into CodeMirror v6
      
      return () => {
        view.destroy();
      };
    }
  }, [editorView]);

  // Fetch LeetCode problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // For development, use mock data instead of API call
        const mockData = [
          {
            id: '1',
            title: 'Two Sum',
            difficulty: 'Easy',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
            examples: [
              {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
              }
            ]
          },
          {
            id: '2',
            title: 'Add Two Numbers',
            difficulty: 'Medium',
            description: 'You are given two non-empty linked lists representing two non-negative integers.',
            examples: [
              {
                input: 'l1 = [2,4,3], l2 = [5,6,4]',
                output: '[7,0,8]',
                explanation: '342 + 465 = 807.'
              }
            ]
          }
        ];
        
        // Comment out the API call for now
        // const response = await fetch('YOUR_LEETCODE_API_ENDPOINT');
        // const data = await response.json();
        
        // Use mock data instead
        setProblems(mockData);
        if (mockData.length > 0) {
          setSelectedProblem(mockData[0]);
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Handle problem selection
  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    if (editorView) {
      // Reset editor content when selecting a new problem
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: '// Write your solution here\n\n'
        }
      });
    }
  };

  // Handle code submission
  const handleSubmitCode = () => {
    if (editorView) {
      const code = editorView.state.doc.toString();
      console.log('Submitting code:', code);
      // Add your submission logic here
      // For example: submitCodeToBackend(selectedProblem.id, code);
    }
  };

  return (
    <div className="workspace-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      overflow: 'hidden'
    }}>
      {/* Top section (50% height) containing problem and game */}
      <div style={{ 
        display: 'flex', 
        height: '50%', 
        borderBottom: '1px solid #ccc'
      }}>
        {/* LeetCode problem area (left side) */}
        <div style={{ 
          width: '50%', 
          padding: '15px', 
          overflow: 'auto',
          borderRight: '1px solid #ccc'
        }}>
          <h2>LeetCode Problems</h2>
          {loading ? (
            <p>Loading problems...</p>
          ) : (
            <>
              <div className="problem-selector">
                <select 
                  onChange={(e) => handleProblemSelect(problems.find(p => p.id === e.target.value))}
                  value={selectedProblem?.id || ''}
                >
                  {problems.map(problem => (
                    <option key={problem.id} value={problem.id}>
                      {problem.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedProblem && (
                <div className="problem-details">
                  <h3>{selectedProblem.title}</h3>
                  <div className="difficulty" style={{ 
                    color: selectedProblem.difficulty === 'Easy' ? 'green' : 
                           selectedProblem.difficulty === 'Medium' ? 'orange' : 'red' 
                  }}>
                    {selectedProblem.difficulty}
                  </div>
                  <div className="problem-description">
                    {selectedProblem.description}
                  </div>
                  <div className="examples">
                    <h4>Examples:</h4>
                    {selectedProblem.examples?.map((example, idx) => (
                      <div key={idx} className="example">
                        <p><strong>Input:</strong> {example.input}</p>
                        <p><strong>Output:</strong> {example.output}</p>
                        {example.explanation && (
                          <p><strong>Explanation:</strong> {example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Phaser game area (right side) */}
        <div style={{ 
          width: '50%', 
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2>Phaser Game Area</h2>
          <div
            ref={gameRef}
            style={{
              width: '480px',
              height: '320px',
              border: '2px solid #333',
            }}
          />
        </div>
      </div>
      
      {/* Code editor section (bottom 50%) */}
      <div style={{ 
        height: '50%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '10px',
          borderBottom: '1px solid #ccc',
          backgroundColor: '#f3f3f3'
        }}>
          <h2>Code Editor</h2>
          <button 
            onClick={handleSubmitCode}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Solution
          </button>
        </div>
        <div 
          ref={editorRef} 
          style={{ 
            flex: 1,
            overflow: 'auto'
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceIDEGame;